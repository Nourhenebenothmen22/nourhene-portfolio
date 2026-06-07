import { FaDatabase, FaNodeJs, FaReact } from "react-icons/fa6";
import { SiElasticsearch, SiExpress, SiGrafana, SiKibana, SiMongodb, SiPostgresql, SiPrometheus } from "react-icons/si";
import { TbApi, TbChartLine, TbCloudDataConnection, TbGitBranch, TbServerCog } from "react-icons/tb";

export const stackCycles = [
  {
    id: "development",
    accent: "cyan",
    icon: TbApi,
    nodes: [
      { label: "React.js", icon: FaReact },
      { label: "Node.js", icon: FaNodeJs },
      { label: "Express.js", icon: SiExpress },
      { label: "MongoDB", icon: SiMongodb },
      { label: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    id: "mlops",
    accent: "violet",
    icon: TbServerCog,
    nodes: [
      { label: "DVC", icon: TbGitBranch },
      { label: "MLflow", icon: TbChartLine },
      { label: "Elasticsearch", icon: SiElasticsearch },
      { label: "Kibana", icon: SiKibana },
      { label: "Prometheus", icon: SiPrometheus },
      { label: "Grafana", icon: SiGrafana },
    ],
  },
  {
    id: "bigdata",
    accent: "emerald",
    icon: TbCloudDataConnection,
    nodes: [
      { label: "NiFi", icon: TbCloudDataConnection },
      { label: "HDFS", icon: FaDatabase },
      { label: "MapReduce", icon: TbServerCog },
      { label: "Hive", icon: FaDatabase },
      { label: "Matplotlib", icon: TbChartLine },
    ],
  },
];
