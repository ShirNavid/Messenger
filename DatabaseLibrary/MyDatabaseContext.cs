using Microsoft.EntityFrameworkCore;
using ModelsLibrary.Models;

namespace DatabaseLibrary;

public class MyDatabaseContext : DbContext
{
    public MyDatabaseContext(DbContextOptions<MyDatabaseContext> options) : base(options)
    {
    }

    public DbSet<MessageContent> MessageContents { get; set; }
    public DbSet<FileData> Files { get; set; }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<MessageLink> MessageLinks { get; set; }
    public DbSet<Notification> Notifs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MessageContent>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<MessageContent>()
            .Property(c => c.Text)
            .IsRequired();
        modelBuilder.Entity<MessageContent>()
            .HasMany(c => c.MessageLinks)
            .WithOne(c => c.MessageContent)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
        modelBuilder.Entity<MessageContent>()
            .Property(c => c.HasBeenSeen)
            .IsRequired();
        modelBuilder.Entity<MessageContent>()
            .HasOne(c => c.FileData)
            .WithOne(c => c.MessageContent)
            .HasForeignKey<FileData>(c => c.MessageContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FileData>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<FileData>()
            .Property(c => c.Name)
            .IsRequired();
        modelBuilder.Entity<FileData>()
            .Property(c => c.Content)
            .IsRequired();
        modelBuilder.Entity<FileData>()
            .Property(c => c.Type)
            .IsRequired();

        modelBuilder.Entity<MessageLink>()
                .HasKey(c => c.Id);
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.MessageContentId)
            .IsRequired();
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.ReceiverId)
            .IsRequired();
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.SenderId)
            .IsRequired();
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.OwnerId)
            .IsRequired();
        modelBuilder.Entity<MessageLink>()
            .HasOne(c => c.Sender)
            .WithMany(c => c.Senders)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<MessageLink>()
            .HasOne(c => c.Receiver)
            .WithMany(c => c.Receivers)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<MessageLink>()
            .HasOne(c => c.Owner)
            .WithMany(c => c.Owners)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.Time)
            .IsRequired();
        modelBuilder.Entity<MessageLink>()
            .Property(c => c.HasBeenPinned)
            .IsRequired();

        modelBuilder.Entity<Notification>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<Notification>()
            .HasOne(c => c.Sender)
            .WithMany(c => c.NotificationSenders)
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction)
            ;
        modelBuilder.Entity<Notification>()
            .HasOne(c => c.Receiver)
            .WithMany(c => c.NotificationReceivers)
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction)
            ;

        modelBuilder.Entity<Account>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<Account>()
            .Property(c => c.Name)
            .IsRequired();
        modelBuilder.Entity<Account>()
            .Property(c => c.Password)
            .IsRequired();
        modelBuilder.Entity<Account>()
            .Property(c => c.Picture)
            .IsRequired();
        modelBuilder.Entity<Account>()
            .HasOne(c => c.Role)
            .WithMany(c => c.Accounts)
            .IsRequired();

        modelBuilder.Entity<Role>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<Role>()
            .Property(c => c.Name)
            .IsRequired();
    }

    public void SetData()
    {
        var rolesCount = Roles.Count();
        if (rolesCount == 0)
        {
            Role role;
            role = new()
            {
                Name = "Admin",
            };
            Roles.Add(role);

            role = new()
            {
                Name = "User",
            };
            Roles.Add(role);

            SaveChanges();
        }

        var accountsCount = Accounts.Count();
        if (accountsCount == 0)
        {
            byte[] imageArray = System.IO.File.ReadAllBytes("../PublishedMessenger/wwwroot/pic/554219_440__.png");
            string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            var roles = Roles.ToList();

            Account account = new()
            {
                Name = "Admin",
                Password = "admin",
                Role = roles[0],
                Picture = imageArray,
            };
            Accounts.Add(account);
            for (int i = 0; i < 5; i++)
            {
                account = new Account
                {
                    Name = "Name" + (i + 1).ToString(),
                    Password = "Password" + (i + 1).ToString(),
                    Role = roles[1],
                    Picture = imageArray,
                };
                Accounts.Add(account);
            }
            SaveChanges();
        }

        var contentsCount = Set<MessageContent>().Count();
        if (contentsCount == 0)
        {
            var accounts = Accounts.ToList();
            var mainTitle = "Title";
            var mainText = "Text";

            for (int i = 0; i < accounts.Count; i++)
            {
                for (int j = i + 1; j < accounts.Count; j++)
                {
                    for (int k = 0; k < 10; k++)
                    {
                        var title = mainTitle + (i * accounts.Count + j + k).ToString();
                        var text = mainText + (i * accounts.Count + j + k).ToString();

                        var messageContent = new MessageContent()
                        {
                            BaseMessageContentId = null,
                            Title = title,
                            Text = text,
                            HasBeenSeen = false,
                        };
                        Set<MessageContent>().Add(messageContent);

                        var firstAccount = accounts[i];
                        var secondAccount = accounts[j];
                        var messageLink1 = new MessageLink
                        {
                            HasBeenPinned = false,
                            Time = DateTime.Now,
                            MessageContent = messageContent,
                            OwnerId = firstAccount.Id,
                            ReceiverId = firstAccount.Id,
                            SenderId = secondAccount.Id,
                        };
                        Set<MessageLink>().Add(messageLink1);

                        var messageLink2 = new MessageLink
                        {
                            HasBeenPinned = false,
                            Time = DateTime.Now,
                            MessageContent = messageContent,
                            OwnerId = secondAccount.Id,
                            ReceiverId = firstAccount.Id,
                            SenderId = secondAccount.Id,
                        };
                        Set<MessageLink>().Add(messageLink2);
                    }
                }
            }
            SaveChanges();

        }
    }
}


