using System.Text.Json.Serialization;
using LibraryAPI.Models;

public class Author
{
    public int Id { get; set; }
    public required string Name { get; set; }  // Required
    public string? Bio { get; set; }           // Optional

    [JsonIgnore]  // Prevent circular reference in JSON output
    public List<Book> Books { get; set; } = new();
}
