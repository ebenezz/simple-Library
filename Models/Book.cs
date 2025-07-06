using System.Text.Json.Serialization;

namespace LibraryAPI.Models
{
    public class Book
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string ISBN { get; set; }
        public int AuthorId { get; set; }

        public Author? Author { get; set; }  // Remove [JsonIgnore] to allow author info in JSON
    }
}
