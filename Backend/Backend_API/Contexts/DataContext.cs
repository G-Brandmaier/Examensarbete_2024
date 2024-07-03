using Backend_API.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend_API.Contexts;

public class DataContext : IdentityDbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<UserProfileEntity> UserProfile { get; set; }
    public DbSet<ReviewEntity> Review { get; set; }
    public DbSet<RatingEntity> Rating { get; set; }
    public DbSet<WatchListItemEntity> WatchListItem { get; set; }
    public DbSet<UserProfileWatchListItemEntity> UserProfileWatchListItem { get; set; }

}