using System.Text.Json.Serialization;

namespace LibraryAPI.Models;

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string ISBN { get; set; }
    public int AuthorId { get; set; }

    [JsonIgnore]  // Ignore navigation property in JSON input/output
    public Author? Author { get; set; }
}
