using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models.Entities;

public class RatingEntity
{
    public int Id { get; set; }

    public int MediaId { get; set; }

    public string MediaType { get; set; } = null!;

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal? Average { get; set; }
}
