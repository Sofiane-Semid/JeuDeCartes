using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models.Models;

namespace Models.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public const string ADMIN_ROLE = "admin";

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Card>().HasData(Seed.SeedCards());

        builder.Entity<IdentityUser>().HasData(Seed.SeedUsers());
        builder.Entity<IdentityRole>().HasData(Seed.SeedRoles());
        builder.Entity<Probabilite>().HasData(Seed.SeedProbabilities());
        builder.Entity<IdentityUserRole<string>>().HasData(Seed.SeedUserRoles());
        builder.Entity<CarteDepart>().HasData(Seed.SeedCartesDepart());
        builder.Entity<Configurations>().HasData(Seed.SeedConfigurations());
        builder.Entity<Power>().HasData(Seed.SeedPowers());
        builder.Entity<Status>().HasData(Seed.SeedStatus());
        builder.Entity<CardPower>().HasData(
            new CardPower()
            {
                Id = 1,
                CardId=1,
                PowerId=1,
                Value=1
            },
            new CardPower()
            {
                Id = 2,
                CardId = 2,
                PowerId = 2,
                Value = 5
            },
            new CardPower()
            {
                Id = 3,
                CardId = 3,
                PowerId = 3,
                Value = 1
            },
            new CardPower()
            {
                Id = 4,
                CardId = 4,
                PowerId = 4,
                Value = 3
            },
            new CardPower()
            {
                Id = 5,
                CardId = 5,
                PowerId = Models.Power.POISON_ID,
                Value = 3
            },
            new CardPower()
            {
                Id = 6,
                CardId = 6,
                PowerId = Models.Power.STUN_ID,
                Value = 3
            },
            new CardPower()
            {
                Id = 7,
                CardId = 7,
                PowerId = Models.Power.RAGE_ID,
                Value = 3
            },
            new CardPower()
            {
                Id = 8,
                CardId = 8,
                PowerId = Models.Power.EARTHQUAKE_ID,
                Value = 0
            }, new CardPower()
            {
                Id = 9,
                CardId = 9,
                PowerId = Models.Power.RANDOM_PAIN_ID,
                Value = 2
            }, new CardPower()
            {
                Id = 10,
                CardId = 10,
                PowerId = Models.Power.CHAOS_ID,
                Value = 3
            }
            );

        builder.Entity<PaquetCartes>().HasData(Seed.SeedPacks());
        builder.Entity<IdentityUser>().HasData(Seed.SeedTestUsers());
        builder.Entity<Player>().HasData(Seed.SeedTestPlayers());

        // Lorsque le modèle de données se complexifient, il faut éventuellement utiliser Fluent API
        // https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/fluent/types-and-properties
        // pour préciser certaines relations.
        // Nous allons couvrir ce sujet plus tard dans la session
        builder.Entity<Match>()
            .HasOne(m => m.PlayerDataA)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Match>()
            .HasOne(m => m.PlayerDataB)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<PlayableCard>()
            .HasOne(pc => pc.CardsPileOwner)
            .WithMany(mp => mp.CardsPile)
            .HasForeignKey(pc => pc.CardsPileOwnerId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<PlayableCard>()
            .HasOne(pc => pc.HandOwner)
            .WithMany(mp => mp.Hand)
            .HasForeignKey(pc => pc.HandOwnerId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<PlayableCard>()
            .HasOne(pc => pc.BattleFieldOwner)
            .WithMany(mp => mp.BattleField)
            .HasForeignKey(pc => pc.BattleFieldOwnerId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<PlayableCard>()
            .HasOne(pc => pc.GraveyardOwner)
            .WithMany(mp => mp.Graveyard)
            .HasForeignKey(pc => pc.GraveyardOwnerId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Player>()
            .HasMany(p => p.Decks)
            .WithOne(d => d.Player)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Player>()
            .HasMany(p => p.OwnedCards)
            .WithOne(d => d.Player)
            .OnDelete(DeleteBehavior.NoAction);

        // Fin de Fluent API
    }

    public DbSet<Card> Cards { get; set; } = default!;

    public DbSet<Player> Players { get; set; } = default!;

    public DbSet<PaquetCartes> Paquets { get; set; }
    public DbSet<Probabilite> Probabilites { get; set; }

    public DbSet<Match> Matches { get; set; } = default!;
    public DbSet<OwnedCard> OwnedCards { get; set; }

    public DbSet<MatchPlayerData> MatchPlayersData { get; set; } = default!;
   
    public DbSet<CarteDepart> CarteDeparts { get; set; }
    public DbSet<Configurations> Configuration { get; set; }

    public DbSet<Power> Power { get; set; }

    public DbSet<CardPower> CardPower { get; set; }
    public DbSet<Deck> Decks { get; set; }
}
