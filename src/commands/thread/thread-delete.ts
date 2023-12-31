import { GuildMemberRoleManager, SlashCommandBuilder, TextChannel } from 'discord.js';
import { SlashCommand } from '../../types';
import { prisma } from '../../lib/prisma';

export const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('thread-delete')
        .setDescription('create private channel')
        .addChannelOption(option => option
            .setName('thread')
            .setDescription('thread')
            .setRequired(true)),
    execute: async (interaction) => {
        const thread = interaction.options.getChannel('thread');
        const threadData = await prisma.thread.findFirst({
            where: {
                name: thread!.name!
            }
        });
        const role = interaction.member?.roles as GuildMemberRoleManager;
        if (threadData && (interaction.user.id === threadData?.adminId || role.cache.has(process.env.OBSERVER_ID!))) {
            await interaction.deferReply({ ephemeral: true });
            const channel = await interaction.client.channels.fetch(process.env.THREAD_ID!) as TextChannel;
            const threadChannel = channel.threads.cache.find(x=> x.id === thread?.id);
            await prisma.thread.delete({
                where: {
                    id: threadData?.id
                }
            });
            await interaction.editReply(`${thread?.name} 이가 성공적으로 삭제되었습니다.`);
            await threadChannel?.delete();
            
        } else {
            interaction.reply({ content: `${thread?.name} 이가 쓰레드가 아니거나 당신의 소유가 아닙니다`, ephemeral: true });
        }
    }
};