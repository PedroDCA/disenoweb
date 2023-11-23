import UserOrder from "./userOrder";

function UserOrderHistorySection({ orderList }) {
  return (
    <div>
      {orderList?.map?.((order, index) => (
        <UserOrder orderInformation={order} key={index} />
      ))}
    </div>
  );
}

export default UserOrderHistorySection;
