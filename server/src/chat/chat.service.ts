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

  async getOrCreateConversation(doctorId: string, patientId: string) {
    let conv = await this.convModel.findOne({
      doctor: doctorId,
      patient: patientId,
    });
    if (!conv) {
      conv = await this.convModel.create({
        doctor: doctorId,
        patient: patientId,
      });
    }
    return conv;
  }

  async getConversationById(id: string) {
    const conv = await this.convModel.findById(id).populate('messages');
    if (!conv) throw new NotFoundException('Conversation not found');
    return conv;
  }

  async sendMessage(data: {
    conversation: string;
    sender: string;
    senderModel: 'Doctor' | 'Patient';
    text?: string;
    attachments?: { url: string; type: string; filename?: string }[];
  }) {
    const conv = await this.convModel.findById(data.conversation);
    if (!conv) throw new NotFoundException('Conversation not found');

    const msg = await this.msgModel.create({
      conversation: conv._id,
      sender: new Types.ObjectId(data.sender),
      senderModel: data.senderModel,
      text: data.text || null,
      attachments: data.attachments || [],
    });

    conv.messages.push(msg._id as Types.ObjectId);
    conv.lastMessage =
      data.text || (data.attachments && data.attachments[0]?.filename) || null;
    conv.lastMessageAt = new Date();
    await conv.save();

    return msg;
  }
}
