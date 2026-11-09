using Microsoft.AspNetCore.Identity;
using Models.Models;

namespace Models.Data
{
    public class Seed
    {
        public Seed() { }

        public static Card[] SeedCards()
        {
            return
[
                new Card { Id = 1, Name = "Bulbizarre", Attack = 2, Health = 4, Cost = 3, ImageUrl = "https://www.pokepedia.fr/images/thumb/e/ef/Bulbizarre-RFVF.png/375px-Bulbizarre-RFVF.png", rarete = Rarete.Commune },
                new Card { Id = 2, Name = "Herbizarre", Attack = 3, Health = 5, Cost = 4, ImageUrl = "https://www.pokepedia.fr/images/thumb/4/44/Herbizarre-RFVF.png/375px-Herbizarre-RFVF.png", rarete = Rarete.Commune },
                new Card { Id = 3, Name = "Florizarre", Attack = 5, Health = 6, Cost = 6, ImageUrl = "https://www.pokepedia.fr/images/thumb/4/42/Florizarre-RFVF.png/375px-Florizarre-RFVF.png", rarete = Rarete.Rare },

                new Card { Id = 4, Name = "Reptincel", Attack = 4, Health = 3, Cost = 4, ImageUrl = "https://www.pokepedia.fr/images/thumb/6/64/Reptincel-RFVF.png/375px-Reptincel-RFVF.png", rarete = Rarete.Rare },
                new Card { Id = 5, Name = "Dracofeu", Attack = 7, Health = 6, Cost = 7, ImageUrl = "https://www.pokepedia.fr/images/thumb/1/17/Dracaufeu-RFVF.png/375px-Dracaufeu-RFVF.png", rarete = Rarete.Epique },

                new Card { Id = 6, Name = "Carapuce", Attack = 2, Health = 4, Cost = 3, ImageUrl = "https://www.pokepedia.fr/images/thumb/c/cc/Carapuce-RFVF.png/375px-Carapuce-RFVF.png", rarete = Rarete.Commune },
                new Card { Id = 7, Name = "Salamèche", Attack = 3, Health = 2, Cost = 3, ImageUrl = "https://www.pokepedia.fr/images/thumb/8/89/Salam%C3%A8che-RFVF.png/375px-Salam%C3%A8che-RFVF.png", rarete = Rarete.Commune },
                new Card { Id = 8, Name = "Tortank", Attack = 5, Health = 8, Cost = 7, ImageUrl = "https://www.pokepedia.fr/images/thumb/2/24/Tortank-RFVF.png/375px-Tortank-RFVF.png", rarete = Rarete.Epique },

                new Card { Id = 9, Name = "Carabaffe", Attack = 3, Health = 4, Cost = 3, ImageUrl = "https://www.pokepedia.fr/images/thumb/2/2a/Carabaffe-RFVF.png/375px-Carabaffe-RFVF.png", rarete = Rarete.Rare },
                new Card { Id = 10, Name = "Keunotor", Attack = 2, Health = 2, Cost = 2, ImageUrl = "https://www.pokepedia.fr/images/thumb/2/28/Keunotor-DP.png/375px-Keunotor-DP.png", rarete = Rarete.Commune },

                new Card { Id = 11, Name = "Pikachu", Attack = 3, Health = 2, Cost = 3, ImageUrl = "https://www.pokepedia.fr/images/thumb/e/e7/Pikachu-RFVF.png/375px-Pikachu-RFVF.png", rarete = Rarete.Commune },
                new Card { Id = 12, Name = "Evoli", Attack = 2, Health = 3, Cost = 2, ImageUrl = "https://www.pokepedia.fr/images/thumb/9/98/%C3%89voli-LPZA.png/375px-%C3%89voli-LPZA.png", rarete = Rarete.Commune },

                new Card { Id = 13, Name = "Lucario", Attack = 5, Health = 4, Cost = 5, ImageUrl = "https://www.pokepedia.fr/images/thumb/e/e6/Lucario-DP.png/375px-Lucario-DP.png", rarete = Rarete.Rare },
                new Card { Id = 14, Name = "Ectoplasma", Attack = 4, Health = 3, Cost = 4, ImageUrl = "https://www.pokepedia.fr/images/thumb/8/8d/Ectoplasma-RFVF.png/375px-Ectoplasma-RFVF.png", rarete = Rarete.Rare },

                new Card { Id = 15, Name = "Gardevoir", Attack = 4, Health = 5, Cost = 5, ImageUrl = "https://www.pokepedia.fr/images/thumb/3/30/Gardevoir-RS.png/375px-Gardevoir-RS.png", rarete = Rarete.Epique },
                new Card { Id = 16, Name = "Amphinobi", Attack = 5, Health = 3, Cost = 4, ImageUrl = "https://www.pokepedia.fr/images/thumb/7/75/Amphinobi-XY.png/375px-Amphinobi-XY.png", rarete = Rarete.Epique },
                new Card { Id = 17, Name = "Ronflex", Attack = 3, Health = 9, Cost = 6, ImageUrl = "https://www.pokepedia.fr/images/thumb/2/2b/Ronflex-RFVF.png/375px-Ronflex-RFVF.png", rarete = Rarete.Epique },

                new Card { Id = 18, Name = "Félinferno", Attack = 6, Health = 5, Cost = 6, ImageUrl = "https://www.pokepedia.fr/images/thumb/0/02/F%C3%A9linferno-SL.png/375px-F%C3%A9linferno-SL.png", rarete = Rarete.Rare },

                new Card { Id = 19, Name = "Carchacrok", Attack = 7, Health = 6, Cost = 7, ImageUrl = "https://www.pokepedia.fr/images/thumb/a/ae/Carchacrok-DP.png/375px-Carchacrok-DP.png", rarete = Rarete.Legendaire },
                new Card { Id = 20, Name = "Mewtwo", Attack = 6, Health = 6, Cost = 7, ImageUrl = "https://www.pokepedia.fr/images/thumb/d/db/Mewtwo-RFVF.png/375px-Mewtwo-RFVF.png", rarete = Rarete.Legendaire }
            ];

        }
        public static List<PaquetCartes> SeedPacks()
        {
            return new List<PaquetCartes>
    {
        new PaquetCartes
        {
            Id = 1,
            Nom = "Basic Pack",
            Prix = 50,
            NbCartes = 3,
            RareteParDefaut = Rarete.Commune,
            ImageUrl = "assets/packs/basic.png"
        },
        new PaquetCartes
        {
            Id = 2,
            Nom = "Normal Pack",
            Prix = 100,
            NbCartes = 4,
            RareteParDefaut = Rarete.Commune,
            ImageUrl = "assets/packs/normal.png"
        },
        new PaquetCartes
        {
            Id = 3,
            Nom = "Super Pack",
            Prix = 200,
            NbCartes = 5,
            RareteParDefaut = Rarete.Rare,
            ImageUrl = "assets/packs/super.png"
        }
    };
        }

        public static List<Probabilite> SeedProbabilities()
        {
            return new List<Probabilite>
    {
        
        new Probabilite
        {
            Id = 1,
            PaquetCartesId = 1,
            Rarity = Rarete.Rare,
            Value = 0.3,
            BaseQty = 0
        },

        
        new Probabilite
        {
            Id = 2,
            PaquetCartesId = 2,
            Rarity = Rarete.Rare,
            Value = 0.3,
            BaseQty = 1 
        },
        new Probabilite
        {
            Id = 3,
            PaquetCartesId = 2,
            Rarity = Rarete.Epique,
            Value = 0.1,
            BaseQty = 0
        },
        new Probabilite
        {
            Id = 4,
            PaquetCartesId = 2,
            Rarity = Rarete.Legendaire,
            Value = 0.02,
            BaseQty = 0
        },

       
        new Probabilite
        {
            Id = 5,
            PaquetCartesId = 3,
            Rarity = Rarete.Epique,
            Value = 0.25,
            BaseQty = 1 
        },
        new Probabilite
        {
            Id = 6,
            PaquetCartesId = 3,
            Rarity = Rarete.Legendaire,
            Value = 0.1,
            BaseQty = 0
        }
    };
        }

        public static CarteDepart[] SeedCartesDepart()
        {
            return
            [
                new CarteDepart
                {
                    Id = 1,
                    Carte = "Bulbizarre",
                    
                    ImageUrl = "https://www.pokepedia.fr/Bulbizarre-RFVF.png"
                }, new CarteDepart
                {
                    Id = 2,
                    Carte = "Herbizarre"
                    ,
                    ImageUrl = "https://www.pokepedia.fr/images/4/44/Herbizarre-RFVF.png"
                }, new CarteDepart
                {
                    Id = 3,
                    Carte = "Florizarre",
                    
                    ImageUrl = "https://www.pokepedia.fr/images/4/42/Florizarre-RFVF.png"
                }, new CarteDepart
                {
                    Id = 4,
                    Carte = "Reptincel",
                    
                    ImageUrl = "https://www.pokepedia.fr/images/6/64/Reptincel-RFVF.png"
                }, new CarteDepart
                {
                    Id = 5,
                    Carte = "Dracofeu",
                    
                    ImageUrl = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png"
                }, new CarteDepart
                {
                    Id = 6,
                    Carte = "Carapuce",
                    
                    ImageUrl = "https://www.pokepedia.fr/images/c/cc/Carapuce-RFVF.png"
                    
                }, new CarteDepart
                {
                    Id = 7,
                    Carte = "Salamèche",
                    
                    ImageUrl = "https://www.pokepedia.fr/images/thumb/8/89/Salam%C3%A8che-RFVF.png/250px-Salam%C3%A8che-RFVF.png"


                }, new CarteDepart
                {
                    Id = 8,
                    Carte = "Tortank",

                    ImageUrl = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png"

                }, new CarteDepart
                {
                    Id = 9,
                    Carte = "Carabaffe",

                    ImageUrl = "https://www.pokepedia.fr/images/2/2a/Carabaffe-RFVF.png"

                }, new CarteDepart
                {
                    Id = 10,
                    Carte = "Keunotor",

                    ImageUrl = "https://www.pokepedia.fr/images/2/28/Keunotor-DP.png"

                }
               
                //new CarteDepart { Id = 1, Carte = "Chat Furtif", ImageUrl = "https://cdn.theatlantic.com/thumbor/fOZjgqHH0RmXA1A5ek-yDz697W4=/133x0:2091x1020/1200x625/media/img/mt/2015/12/RTRD62Q/original.jpg" },
                //new CarteDepart { Id = 2, Carte = "Jedi Chatton", ImageUrl = "https://townsquare.media/site/142/files/2011/08/jedicats.jpg?w=980&q=75" },
                //new CarteDepart { Id = 3, Carte = "Blob Chat", ImageUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c89c9a3c-7848-4bd5-9306-417c97096ae5/dh8sghm-7bebd975-51f2-4728-87bc-fb3cef176af5.jpg/v1/fit/w_750,h_1000,q_70,strp/another_lucifur_blob_by_slugyyycat_dh8sghm-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcL2M4OWM5YTNjLTc4NDgtNGJkNS05MzA2LTQxN2M5NzA5NmFlNVwvZGg4c2dobS03YmViZDk3NS01MWYyLTQ3MjgtODdiYy1mYjNjZWYxNzZhZjUuanBnIiwid2lkdGgiOiI8PTc1MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.7oGugpkEX4yqfhiOXlo4TfqzatOuHaCu2aEi-Lnw_40" },

       
                //new CarteDepart { Id = 4, Carte = "Jedi Chat", ImageUrl = "https://images.squarespace-cdn.com/content/51b3dc8ee4b051b96ceb10de/1394662654865-JKOZ7ZFF39247VYDTGG9/hilarious-jedi-cats-fight-video-preview.jpg?content-type=image%2Fjpeg" },
                //new CarteDepart { Id = 5, Carte = "Chat Laser", ImageUrl = "https://store.playstation.com/store/api/chihiro/00_09_000/container/AU/en/99/EP2402-CUSA05624_00-ETH0000000002875/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720" },
                //new CarteDepart { Id = 6, Carte = "Chat Guerrier", ImageUrl = "https://i.etsystatic.com/6230905/r/il/32aa5a/3474618751/il_fullxfull.3474618751_mfvf.jpg" }
            ];
        }

        public static Configurations[] SeedConfigurations()
        {
            return
            [
                new Configurations
                {
                    Id = 1,
                    NbCardsApiger = 4,
                    ManaParTour = 3,
                    MaxDeckParJoueur = 3,
                    MaxCartesParDeck = 12,
                    CoinsOnRegister = 100,
                    CoinsOnWin = 50,
                    CoinsOnLose = 10
                }
            ];
        }



        public static IdentityUser[] SeedUsers()
        {
            PasswordHasher<IdentityUser> hasher = new();
            IdentityUser admin = new()
            {
                Id = "11111111-1111-1111-1111-111111111111",
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                // La comparaison d'identity se fait avec les versions normalisés
                NormalizedEmail = "ADMIN@ADMIN.COM",
                NormalizedUserName = "ADMIN@ADMIN.COM",
                EmailConfirmed = true,
                // On encrypte le mot de passe
                PasswordHash = hasher.HashPassword(null, "Passw0rd!"),
                LockoutEnabled = true
            };

            return [admin];
        }

        public static IdentityRole[] SeedRoles()
        {
            IdentityRole adminRole = new()
            {
                Id = "11111111-1111-1111-1111-111111111112",
                Name = ApplicationDbContext.ADMIN_ROLE,
                NormalizedName = ApplicationDbContext.ADMIN_ROLE.ToUpper()
            };

            return [adminRole];
        }

        public static IdentityUserRole<string>[] SeedUserRoles()
        {
            IdentityUserRole<string> userAdmin = new()
            {
                RoleId = "11111111-1111-1111-1111-111111111112",
                UserId = "11111111-1111-1111-1111-111111111111"
            };
            return [userAdmin];
        }

        public static IdentityUser[] SeedTestUsers()
        {
            return
            [
                new IdentityUser()
                {
                    Id = "User1Id"
                },
                new IdentityUser
                {
                Id = "User2Id"
                }
            ];
        }

        public static Player[] SeedTestPlayers()
        {
            return
            [
                new Player
                {
                    Id = 1,
                    Name = "Test player 1",
                    UserId = "User1Id"

                },
                new Player
                {
                    Id = 2,
                    Name = "Test player 2",
                    UserId = "User2Id"
                }
            ];
        }

        public static Status[] SeedStatus()
        {
            return [
                new Status{
                    Id = Status.POISON_ID,
                    Description="Fait descendre la vie graduellement",
                    Name="Poison",
                    Icone="fa-skull-crossbones"
                    
                },new Status{
                    Id = Status.STUN_ID,
                    Description="Fait descendre la vie graduellement",
                    Name="Stun",
                    Icone="fa-skull-crossbones"

                },new Status{
                    Id = Status.RAGE_ID,
                    Description="Fait descendre la vie graduellement",
                    Name="Rage",
                    Icone="fa-skull-crossbones"

                }
                ];
        }

        public static Power[] SeedPowers()
        {
            return [
                new Power{
                    Id = Power.FIRST_STRIKE_ID,
                    Name="First Strike",
                    Description="Empêche à la carte de prendre des dégât si elle en tue une autre à l'attaque",
                    Icone="fa-arrows-to-circle"
                },
                new Power{
                    Id = Power.THORNS_ID,
                    Name="Thorns",
                    Description="Quand cette carte prend des dégats, elle fait le nombre de dégât à l'attaquant égale à la valeur",
                    Icone="fa-road-spikes"
                },
                new Power{
                    Id = Power.HEAL_ID,
                    Name="Heal",
                    Description="Soigne les cartes alliés de la valeur ainsi qu'elle même avant d'attaquer",
                    Icone="fa-cross"
                },
                new Power{
                    Id = Power.THIEF_HEALTH_ID,
                    Name="AutoHeal",
                    Description="Quand cette fait du dégât a un ennemi, elle se soigne pour la quantité de dégât fait",
                    Icone="fa-droplet"
                },
                new Power{
                    Id = Power.POISON_ID,
                    Name="AutoHeal",
                    Description="Empoisone la carte",
                    Icone="fa-skull-crossbones"
                },
                new Power{
                    Id = Power.RAGE_ID,
                    Name="AutoHeal",
                    Description="Augmente l'attaque",
                    Icone="fa-face-angry"
                },
                new Power{
                    Id = Power.STUN_ID,
                    Name="Stun",
                    Description="Empêche la carte d'agir",
                    Icone="fa-spiral"
                },
                new Power{
                    Id = Power.CHAOS_ID,
                    Name="Chaos",
                    Description="inverse l'attaque et la défense de TOUTES les cartes",
                    Icone="fa-arrow-right-arrow-left"
                },
                new Power{
                    Id = Power.EARTHQUAKE_ID,
                    Name="Earthquake",
                    Description="fait un certain nombre de dégât à TOUTES les cartes",
                    Icone="fa-house-crack"
                },
                new Power{
                    Id = Power.RANDOM_PAIN_ID,
                    Name="Earthquake",
                    Description="inflige entre 1 et 6 dégat a une carte",
                    Icone="fa-dice"
                }
                ];
        }

        

    }
}

