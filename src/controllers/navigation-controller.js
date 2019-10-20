import { render } from "../utils";
import { Navigation } from "../components/navigation";

export class NavigationController {
  constructor(container, onNavigationChange) {
    this._navigation = new Navigation();
    this._onNavigationChange = onNavigationChange;
    this._container = container;
  }

  init() {
    render(this._container, this._navigation.getElement(), "beforeend");
    // TODO: listen to navigation change
  }
}
