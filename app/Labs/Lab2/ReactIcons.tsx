import { FaCompassDrafting } from "react-icons/fa6";
import { FaDove } from "react-icons/fa6";
import { FaHatWizard } from "react-icons/fa6";
import { FaKeybase } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa6";

export default function ReactIcons() {
    return (
        <div id="wd-react-icons-sampler" className="mb-4">
      <h3>React Icons Sampler</h3>
      <div className="d-flex">
        <FaCompassDrafting className="fs-3 text" />
        <FaDove className="fs-3 text" />
        <FaHatWizard className="fs-3 text" />
        <FaKeybase className="fs-3 text" />
        <FaLeaf className="fs-3 text" />
      </div>
    </div>
    );
}