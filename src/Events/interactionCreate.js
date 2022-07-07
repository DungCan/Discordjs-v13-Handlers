module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.interactions.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "> **Đã xảy ra lỗi khi thực hiện lệnh này! **",
        ephemeral: true,
      });
    }
}