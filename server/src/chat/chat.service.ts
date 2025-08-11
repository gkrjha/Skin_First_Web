import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from '../Schema/Conversaction.schema';
import { Message } from '../Schema/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name) private convModel: Model<Conversation>,
    @InjectModel(Message.name) private msgModel: Model<Message>,
  ) {}

  async getOrCreateConversationasync(data: {
    conversation?: string;
    doctor?: string;
    patient?: string;
    sender: string;
    senderModel: 'Doctor' | 'Patient';
    text?: string;
    attachments?: { url: string; type: string; filename?: string }[];
  }) {
    let conv;

    if (data.conversation) {
      conv = await this.convModel.findById(data.conversation);
    } else if (data.doctor && data.patient) {
      conv = await this.convModel.findOne({
        doctor: data.doctor,
        patient: data.patient,
      });

      if (!conv) {
        conv = await this.convModel.create({
          doctor: data.doctor,
          patient: data.patient,
        });
      }
    }

    if (!conv) {
      throw new NotFoundException(
        'Conversation not found and insufficient info to create one.',
      );
    }

    const msg = await this.msgModel.create({
      conversation: conv._id,
      sender: new Types.ObjectId(data.sender),
      senderModel: data.senderModel,
      text: data.text || undefined,
      attachments: data.attachments || [],
    });

    conv.messages.push(msg._id);
    conv.lastMessage =
      data.text || data.attachments?.[0]?.filename || undefined;
    conv.lastMessageAt = new Date();
    await conv.save();

    return msg;
  }

  async getConversationById(id: string) {
    const conv = await this.convModel.findById(id).populate('messages');
    if (!conv) throw new NotFoundException('Conversation not found');
    return conv;
  }
}
