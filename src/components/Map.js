import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { _, get } from "lodash";
import KeplerGl from "kepler.gl";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import KeplerGlSchema from "kepler.gl/schemas";

const Map = (props) => {
  const keplerGl = useSelector((state) => state?.keplerGl?.KeplerGL);

  const token = window.localStorage.getItem("token");
  let mapToSave;
  console.log("keplerGl", keplerGl);
  if (keplerGl && !mapToSave) {
    mapToSave = KeplerGlSchema.save(keplerGl);
    console.log("mapppppp", mapToSave);
  }
  const computeExpensiveValue = (keplerGl) => {
    let temp;
    if (keplerGl) {
      temp = KeplerGlSchema.save(keplerGl);
    }
    const VAL = mapToSave?.datasets?.at(-1);
    console.log("vallueeee", VAL?.data.label, VAL?.data);
    console.log("type offfff", typeof VAL?.data);
    console.log("string", JSON.stringify(VAL?.data));
    fetch("http://127.0.0.1:8000/api/project/save_file/2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        file_data: VAL?.data,
      }),
    });
  };
  const memoizedValue = useMemo(
    () => computeExpensiveValue(keplerGl),
    [Object.keys(get(keplerGl, "visState.datasets", {})).length]
  );

  // useEffect(() => {
  //   let temp;
  //   if (keplerGl) {
  //     temp = KeplerGlSchema.save(keplerGl);
  //   }
  //   const VAL = mapToSave?.datasets?.at(-1);
  //   console.log("vallueeee", VAL?.data.label, VAL?.data);
  //   console.log("type offfff", typeof VAL?.data);
  //   console.log("string", JSON.stringify(VAL?.data));
  //   fetch("http://127.0.0.1:8000/api/project/save_file/2", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       file_data: VAL?.data,
  //     }),
  //   });
  // if (!_.isEqual(mapToSave, temp)) {
  //   mapToSave = temp;
  //  console.log("VAL 1",mapToSave)

  // //   formData.append(
  // //     "",
  // //   );
  // //     fetch(`http://127.0.0.1:8000/api/project/save_file`,formData)
  // }
  // }, [keplerGl?.visState?.datasets]);

  let width = "calc(100% - ";
  if (props.open) {
    width += props.drawerWidth + 1;
  } else {
    width += 57 + 1;
  }
  width += "px)";
  // console.log("map", props.openTab);
  return (
    <div
      style={{
        position: "absolute",
        width: width,
        height: "100%",
        transition: "width 500ms ease",
        display: props.openTab === "Map" ? "flex" : "none",
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            appName="Kepler"
            id="KeplerGL"
            mapboxApiAccessToken={
              "pk.eyJ1IjoiaW1yYW4xIiwiYSI6ImNrdTJ6Znp6ajJ1cmwyb3F0MWVvZXV2dnkifQ.U0hs8T-tsSXuYnsYVUBW5w"
            }
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  );
};
export default Map;
