import './index.css';

// Importing all Lab components
import ForegroundColors from './ForegroundColors';
import BackgroundColors from './BackgroundColors';
import Borders from './Borders';
import Padding from './Padding';
import Margins from './Margins';
import Corners from './Corners';
import Dimensions from './Dimensions';
import Positions from './Positions';
import ZIndex from './Zindex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIconsSampler from './ReactIcons';
import BootstrapGrids from './BootstrapGrids';
import ScreenSizeLabel from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation';

const Lab2 = () => {
  return (
    <div className="container">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        The style attribute allows configuring look and feel
        right on the element. Although it's very convenient,
        it is considered bad practice and you should avoid
        using the style attribute.
      </p>

      {/* ID Selectors Section */}
      <div id="wd-css-id-selectors">
        <h3>ID Selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the 
          elements of the same name, e.g., P, we can refer to a specific element by its ID.
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and feel.
        </p>
      </div>

      {/* Class Selectors Section */}
      <div id="wd-css-class-selectors">
        <h3>Class Selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's CLASS attribute.
        </p>
        <h4 className="wd-class-selector">
          This heading has the same style as the paragraph above.
        </h4>
      </div>

      {/* Render all other Lab components */}
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <Positions />
      <ZIndex />
      <Float />
      <GridLayout />
      <Flex />
      <ReactIconsSampler />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />
    </div>
  );
};

// Exporting the Lab2 component
export default Lab2;