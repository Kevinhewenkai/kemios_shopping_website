using API.Entities;

// DTO is used to shape the data returning
namespace API.DTOs
{
    public class BasketDto
    {
        public int Id {get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}