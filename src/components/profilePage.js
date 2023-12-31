import { useEffect, useState } from "react";
import Header from "./header";
import LogoSection from "./logoSection";
import { useSelector } from "react-redux";
import {
  fetchChartInformationAsync,
  fetchOrderListAsync,
  fetchProductListAsync,
  fetchProfileInformationAsync,
  getComponentToRender,
  getTabList,
} from "../service/profileService";
import Footer from "./footer";

function ProfilePage() {
  const profileId = useSelector((state) => state.profile.id);
  const profileType = useSelector((state) => state.profile.type);
  const tabs = getTabList(profileType);
  const [profileInformation, setProfileInformation] = useState({});
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [chartInformationList, setChartInformationList] = useState([]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    fetchProfileInformationAsync(profileId, profileType).then(
      (newProfileInformation) => setProfileInformation(newProfileInformation)
    );
  }, [profileId, profileType]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    fetchProductListAsync(profileId, profileType).then((newProductList) =>
      setProductList(newProductList)
    );
  }, [profileId, profileType]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    fetchOrderListAsync(profileId, profileType).then((newOrderList) =>
      setOrderList(newOrderList)
    );
  }, [profileId, profileType]);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    fetchChartInformationAsync(profileId, profileType).then((newOrderList) =>
      setChartInformationList(newOrderList)
    );
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
      chartInformationList
    };
    const componentToRender = getComponentToRender(tabSelected, information);

    if (!componentToRender) {
      return;
    }

    setRenderedComponent(componentToRender);
  }, [tabSelected, profileInformation, orderList, productList, chartInformationList]);

  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="tabs-container">
          {tabs.map((tabInformation, index) => (
            <div className="tab" key={index}>
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
      <Footer />
    </>
  );
}

export default ProfilePage;
