import React, { useEffect } from "react";
import constants from "../constantsApi/strings";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import KeplerGlSchema from "kepler.gl/schemas";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { addDataToMap } from "kepler.gl/actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressWithLabel from "./Progress";
import { useAuth0 } from "@auth0/auth0-react";
import axiosApi from "../helper/apiHelper";
import { _, get } from "lodash";
const avro = require("avsc");
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
  },
  root: {
    margin: ".5%",
    maxWidth: 300,
    minWidth: 150,
  },
  media: {
    height: 120,
  },
}));
const Projects = ({
  drawerOpen,
  openTab,
  setOpenTab,
  drawerWidth,
  setMapButton,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [projects, setProjects] = React.useState([]);
  let width = "calc(100% - ";
  if (drawerOpen) {
    width += drawerWidth + 1;
  } else {
    width += 57 + 1;
  }
  width += "px)";
  const { getAccessTokenSilently } = useAuth0();
  const keplerGl = useSelector((state) => state?.keplerGl?.KeplerGL?.visState.datasets);
console.log("keplerGLLL",keplerGl)
  const array_design_data = {
    fields: [
      // { name: 'id', format: '', type: 'real' },
      { name: "location_id", format: "", type: "integer" },
      { name: "top_depth", format: "", type: "real" },
      { name: "design_specifications_id", format: "", type: "string" },
      { name: "pipeline_voltage", format: "", type: "real" },
      { name: "pipeline_half_space_voltage", format: "", type: "real" },
      { name: "cable_run_length", format: "", type: "integer" },
      { name: "cable_resistance", format: "", type: "real" },
      { name: "contact_resistance", format: "", type: "real" },
      { name: "earth_resistance", format: "", type: "real" },
      { name: "dwight_resistance", format: "", type: "real" },
      { name: "loop_resistance", format: "", type: "real" },
      { name: "driving_voltage", format: "", type: "real" },
      { name: "power_consumption", format: "", type: "integer" },
      { name: "lat", format: "", type: "real" },
      { name: "lon", format: "", type: "real" },
      { name: "offset", format: "", type: "real" },
      { name: "pipeline_km_marker", format: "", type: "integer" },
    ],
    rows: [],
  };
// const data12= {fields :[
//   {
//       "name": "_geojson",
//       "type": "geojson",
//       "format": "",
//       "analyzerType": "GEOMETRY"
//   },
//   {
//       "name": "id",
//       "type": "integer",
//       "format": "",
//       "analyzerType": "INT"
//   },
//   {
//       "name": "priority",
//       "type": "integer",
//       "format": "",
//       "analyzerType": "INT"
//   }
// ],
// rows: [],
// }
  const kp_data = {
    fields: [
      { name: "id", format: "", type: "real" },
      { name: "wkt", format: "", type: "geojson" },
    ],
    rows: [],
  };
  const pipeline_data = {
    fields: [
      { name: "id", format: "", type: "real" },
      { name: "wkt", format: "", type: "geojson" },
    ],
    rows: [],
  };
  // const {datasets, config} = KeplerGlSchema.save(state.keplerGl.foo);
  const handleClose = () => {
    setOpenTab("Map");
  };
  React.useEffect(() => {
    const Function = async () => {
     let auth0Token= await  getAccessTokenSilently()
      console.log("auth0",auth0Token)
      window.localStorage.setItem("token", auth0Token);
      axiosApi
        .get(`${constants.ALL_PROJECT}`)
        .then((res) => {
          console.log("response", res.data);
          setProjects(res.data);
        })
        .catch((err) => {
          console.error("errrooooo", err);
        });
    };
    Function();
  }, [dispatch]);


  const addData = async (data) => {
   const newToken = await getAccessTokenSilently()
    setLoading(true);
    setProgress(0);
    var wkt_json;
    const wkt = await fetch(`/api/project/get_project/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
      },
    });
   
   
    
    // ******************************** GET PROJECT BY ID ***********************************
    wkt_json = await wkt.json();
    console.log("wkt_json",wkt_json)
    const test = KeplerGlSchema.load(wkt_json.saved_files);
    console.log("testttt",test)
    const array_design = await fetch(
      `/api/project/file/` + data.avro_file_name,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
      }
    );
    console.log("array_design",array_design)
    const contentLength = array_design.headers.get("content-length");

    const total = parseInt(contentLength, 10);

    let loaded = 0;

    const res = new Response(
      new ReadableStream({
        async start(controller) {
          const reader = array_design.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            loaded += value.byteLength;
            const total_percentage = parseFloat(
              ((loaded / total) * 100).toFixed(2)
            );
            setProgress(total_percentage);
            controller.enqueue(value);
          }
          controller.close();
        },
      })
    );

    const blob = await res.blob();

    let array = [];

    const obj = avro
      .createBlobDecoder(blob)
      .on("data", (data, index) => {
        array.push([
          // data["_geojson"],
          // data["id"],
          // data["priority"]
          data["location_id"],
          data["top_depth"],
          data["design_specifications_id"],
          data["pipeline_voltage"],
          data["pipeline_half_space_voltage"],
          data["cable_run_length"],
          data["cable_resistance"],
          data["contact_resistance"],
          data["earth_resistance"],
          data["dwight_resistance"],
          data["loop_resistance"],
          data["driving_voltage"],
          data["power_consumption"],
          data["lat"],
          data["lon"],
          data["offset"],
          data["kilometer_point"],
        ]);
      })
      .on("end", (data) => {
        array_design_data.rows = array;
        handleClose();
        setMapButton(true);
        // wkt_json.forEach((response) => {
        //   if (response.name === "kp") {
        //     kp_data.rows.push([response.id, response.wkt]);
        //   } else {
        //     pipeline_data.rows.push([response.id, response.wkt]);
        //   }
        // });
        kp_data.rows.push([2, wkt_json.project_description]);
        setLoading(false);
        dispatch(
          addDataToMap(
             {
          datasets: [
              {
                info: {
                  label: "Array Data",
                  id: "array_data",
                },
                data: array_design_data,
              },
              {
                info: {
                  label: "KP",
                  id: "pipeline_points",
                },
                data: kp_data,
              },
              {
                info: {
                  label: "Pipeline",
                  id: "pipeline",
                },
                data: test,
              },
            ],
            option: {
              centerMap: true,
              readOnly: false,
            },
            // config
            config: {},
          }
          )
          );
      });
  };

  function CardRow({ data }) {
    return (
      <Card className={classes.root} onClick={() => addData(data)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://s3.amazonaws.com/uber-static/kepler.gl/sample/world_flight_s.png"
            title="Project"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Grid
      container
      className={classes.grid}
      style={{ display: openTab === "Projects" ? "flex" : "none" }}
    >
      {loading ? (
        <CircularProgressWithLabel value={progress} />
      ) : (
        <>
          {projects &&
            projects.length &&
            projects.map((project) => (
              <CardRow key={project.name} data={project} />
            ))}
        </>
      )}
    </Grid>
  );
};
export default Projects;
