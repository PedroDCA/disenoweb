import { useEffect, useState } from "react";
import Header from "./header";
import LogoSection from "./logoSection";
import { useSelector } from "react-redux";
import {
  fetchOrderList,
  fetchProductList,
  fetchProfileInformation,
  getComponentToRender,
  getTabList,
} from "../service/profileService";
import Footer from './footer';

function ProfilePage() {
  const profileId = useSelector((state) => state.profile.id);
  const profileType = useSelector((state) => state.profile.type);
  const tabs = getTabList(profileType);
  const [profileInformation, setProfileInformation] = useState({});
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    const newProfileInformation = fetchProfileInformation(
      profileId,
      profileType
    );

    setProfileInformation(newProfileInformation);
  }, [profileId, profileType]);
  
  useEffect(() => {
    if (!profileId) {
      return;
    }

    const newProductList = fetchProductList(
      profileId,
      profileType
    );

    setProductList(newProductList);
  }, [profileId, profileType]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    const newOrderList = fetchOrderList(profileId, profileType);

    setOrderList(newOrderList);
  }, [profileId, profileType]);

  const [tabSelected, setTabSelected] = useState("profileInformation");
  const [renderedComponent, setRenderedComponent] = useState(<></>);

  useEffect(() => {
    if (!tabSelected) {
      return;
    }

    const information = {
      profile: profileInformation,
      orderList,
      productList,
    };
    const componentToRender = getComponentToRender(tabSelected, information);

    if (!componentToRender) {
      return;
    }

    setRenderedComponent(componentToRender);
  }, [tabSelected, profileInformation, orderList, productList]);

  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div>
          {tabs.map((tabInformation, index) => (
            <div key={index}>
              <input
                type="radio"
                name="profileOptions"
                value={tabInformation.type}
                id={`${tabInformation.type}Option`}
                defaultChecked={index === 0}
                key={index}
                onChange={(event) => setTabSelected(event.target.value)}
              />
              <label htmlFor={`${tabInformation.type}Option`}>
                {tabInformation.name}
              </label>
            </div>
          ))}
        </div>
        <div className="container">{renderedComponent}</div>
      </main>
      <Footer/>
    </>
  );
}

export default ProfilePage;
