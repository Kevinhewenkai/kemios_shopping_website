using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> MapOrderToDto (this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    SubTotal = order.SubTotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(x => new OrderItemDto
                    {
                        ProductId = x.ItemOrdered.ProductId,
                        Name = x.ItemOrdered.Name,
                        PictureUrl = x.ItemOrdered.PictureUrl,
                        Price = x.Price,
                        Quantity = x.Quantity,
                    }).ToList()
                }).AsNoTracking();
        }
    }
}