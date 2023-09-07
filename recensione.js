
  
░██████╗██╗██╗░░░░░███████╗██████╗░██╗  ░█████╗░██████╗░██╗░██████╗░██╗███╗░░██╗░█████╗░██╗░░░░░
██╔════╝██║██║░░░░░██╔════╝██╔══██╗██║  ██╔══██╗██╔══██╗██║██╔════╝░██║████╗░██║██╔══██╗██║░░░░░
╚█████╗░██║██║░░░░░█████╗░░██████╔╝██║  ██║░░██║██████╔╝██║██║░░██╗░██║██╔██╗██║███████║██║░░░░░
░╚═══██╗██║██║░░░░░██╔══╝░░██╔══██╗██║  ██║░░██║██╔══██╗██║██║░░╚██╗██║██║╚████║██╔══██║██║░░░░░
██████╔╝██║███████╗███████╗██║░░██║██║  ╚█████╔╝██║░░██║██║╚██████╔╝██║██║░╚███║██║░░██║███████╗
╚═════╝░╚═╝╚══════╝╚══════╝╚═╝░░╚═╝╚═╝  ░╚════╝░╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝


const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("recensione")
        .setDescription("Lascia una recensione nel canale.")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("stelle")
                .setDescription("Numero di stelle.")
                .addChoices(
                    { name: "⭐", value: "⭐" },
                    { name: "⭐⭐", value: "⭐⭐" },
                    { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                    { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                    { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
                )
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("descrizione")
                .setDescription("Scrivi la recensione")
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("developer")
                .setDescription("Chi ti ha aiutato in questo progetto? (facoltativo se hai effettuato una richiesta di aiuto)")
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options, member } = interaction;

        const stelle = options.getString("stelle");
        const descrizione = options.getString("descrizione");
        const developer = options.getUser("developer") || "Non specificato";

        const channel = member.guild.channels.cache.get("1148935827863388186");
        const customer = member.roles.cache.has("1146510150555926599");

        const embed = new EmbedBuilder();

        if (!customer) {
            embed.setColor("Red")
                .setTimestamp()
                .setDescription("Non hai il ruolo per poter effettuare una recensione.")
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed
            .addFields(
                { name: "Developer", value: `${developer}_ _`, inline: true },
                { name: "Stelle", value: `${stelle}`, inline: true },
                { name: "Recensione", value: `${descrizione}\n` },
            )
            .setColor(0x235ee7)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        channel.send({ embeds: [embed] });

        embed.setDescription(`La tua recensione è stata correttamente inviata nel canale ${channel}!\n\n**Preview:** `).setColor(0x235ee7);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}


  
░██████╗██╗██╗░░░░░███████╗██████╗░██╗  ░█████╗░██████╗░██╗░██████╗░██╗███╗░░██╗░█████╗░██╗░░░░░
██╔════╝██║██║░░░░░██╔════╝██╔══██╗██║  ██╔══██╗██╔══██╗██║██╔════╝░██║████╗░██║██╔══██╗██║░░░░░
╚█████╗░██║██║░░░░░█████╗░░██████╔╝██║  ██║░░██║██████╔╝██║██║░░██╗░██║██╔██╗██║███████║██║░░░░░
░╚═══██╗██║██║░░░░░██╔══╝░░██╔══██╗██║  ██║░░██║██╔══██╗██║██║░░╚██╗██║██║╚████║██╔══██║██║░░░░░
██████╔╝██║███████╗███████╗██║░░██║██║  ╚█████╔╝██║░░██║██║╚██████╔╝██║██║░╚███║██║░░██║███████╗
╚═════╝░╚═╝╚══════╝╚══════╝╚═╝░░╚═╝╚═╝  ░╚════╝░╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝

