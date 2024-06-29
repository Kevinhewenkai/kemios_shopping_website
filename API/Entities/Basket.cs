using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        public void addItem(Product product, int quantity)
        {
            if (Items.All(x => x.ProductId != product.Id))
            {
                Items.Add(new BasketItem{Product = product, Quantity = quantity});
            }

            var existingItem = Items.FirstOrDefault(x => x.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void removeItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(x => x.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}