

using System.Text.Json.Serialization;

namespace LibraryAPI.Models
{
    public class Author
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Bio { get; set; }

        [JsonIgnore] // To avoid circular references when serializing
        public List<Book> Books { get; set; } = new();
    }
}
