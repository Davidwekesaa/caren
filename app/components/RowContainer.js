import React from "react";
import MenuCard from "./MenuCard";

function RowContainer({ menuItems, setFilterData }) {
  console.log("menu items ", menuItems);
  return (
    <div className="rowContainer chang">
      {menuItems &&
        menuItems?.map((data) => (
          <div key={data?._id} onClick={(e) => setFilterData(data?._id, e)}>
            <MenuCard
              // imgSrc={data.imgSrc}
              imgSrc={data.imgSrc}
              name={data.name}
              isActive={menuItems?.indexOf(data)}
            />
          </div>
        ))}
    </div>
  );
}

export default RowContainer;
