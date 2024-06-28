using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    // don't need a id, the id will be the owner (order)
    [Owned]
    public class ShippingAddress: Address
    {
        
    }
}