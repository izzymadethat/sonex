import "../styles/fancy-checkbox.css";

const FancyCheckbox = () => {
  return (
    <div class="advanced-checkbox">
      <input type="checkbox" id="advancedCheckbox" />
      <label for="advancedCheckbox">
        <div class="box">
          <div class="front"></div>
          <div class="back"></div>
          <div class="left"></div>
          <div class="right"></div>
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
        <span class="checkmark"></span>
      </label>
    </div>
  );
};

export default FancyCheckbox;
