import { useEffect, useState } from "react";
import Header from "./header";
import LogoSection from "./logoSection";
import ProfileInformationSection from "./profileInformationSection";
import { useSelector } from "react-redux";
import UserOrderHistorySection from "./userOrderHistorySection";
import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";

function ProfilePage() {
  const userId = useSelector((state) => state.user.id);
  const userType = useSelector((state) => state.user.type);
  const [userInformation, setUserInformation] = useState({});
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setUserInformation({
      name: "Pedro",
      lastName: "Calderon",
      email: "pcalderon@gmail.com",
      password: "asda",
    });
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const newOrderList = [
      {
        totalPrice: 30000,
        status: "Completado",
        imageUrl: bronceBottle,
        name: "Botella color ejemplo 750ml",
        vendor: "Nombre vendedor",
        quantity: 2,
        individualPrice: 15000,
        date: "2023-10-04T00:00:00",
      },
      {
        totalPrice: 10000,
        status: "En proceso",
        imageUrl: purpleBottle,
        name: "Botella color ejemplo 750ml",
        vendor: "Nombre vendedor",
        quantity: 5,
        individualPrice: 2000,
        date: "2023-11-15T00:00:00",
      },
    ];

    setOrderList(newOrderList);
  }, [userId]);

  const [tabSelected, setTabSelected] = useState("profileInformation");
  const [renderedComponent, setRenderedComponent] = useState(<></>);

  useEffect(() => {
    if (!tabSelected) {
      return;
    }

    const availableTabs = {
      profileInformation: (
        <ProfileInformationSection userInformation={userInformation} />
      ),
      userOrderHistory: <UserOrderHistorySection orderList={orderList} />,
    };

    const componentToRender = availableTabs[tabSelected];

    if (!componentToRender) {
      return;
    }

    setRenderedComponent(componentToRender);
  }, [tabSelected, userInformation, orderList]);

  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div>
          <input
            type="radio"
            name="profileOptions"
            value="userOrderHistory"
            id="profileInformationOption"
            defaultChecked
            onChange={(event) => setTabSelected(event.target.value)}
          />
          <label htmlFor="profileInformationOption">Panel Comprador</label>
          <input
            type="radio"
            name="profileOptions"
            value="orderHistory"
            id="orderHistoryOption"
            onChange={(event) => setTabSelected(event.target.value)}
          />
          <label htmlFor="orderHistoryOption">Historial de pedidos</label>
        </div>
        <div className="container">{renderedComponent}</div>
      </main>
    </>
  );
}

export default ProfilePage;
