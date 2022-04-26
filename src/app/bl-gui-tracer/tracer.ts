/**
 * A user IP locator class that uses the **fetch API** to asynchronuously 
 * get the IP of a user through an IP API using a corresponding IP API key.
 */
export class UserIPLocator {

  /**
   * The fetched user IP.
   */
  private _userIP = "";

  /**
   * The IP API from which to fetch the user IP.
   */
  private _userIPApi = "https://ipgeolocation.abstractapi.com/v1/";

  /**
   * The IP API key used to fetch the user IP from the IP API.
   */
  private _userIPApiKey = "de8a4390b3514c089e56c67413aee03f";

  /**
   * Returns the fetched user IP (*getter*)
   */
  get userIP(){
    return this._userIP;
  }

  /**
   * Sets `userIP` as this user IP locator's fetched user IP (*setter*).
   * @param userIP A string designating this user IP locator's new fetched user IP.
   */
  set userIP(userIP: string){
    this._userIP = userIP;
  }

  /**
   * Returns IP API from which to fetch the user IP (*getter*)
   */
  get userIPApi(){
    return this._userIPApi;
  }

  /**
   * Sets `userIPApi` as this user IP locator's queried IP API (*setter*).
   * @param userIPApi A string designating this user IP locator's new IP API.
   */
  set userIPApi(userIPApi: string){
    this._userIPApi = userIPApi;
  }

  /**
   * The IP API key used to fetch the user IP from the IP API (*getter*)
   */
  get userIPApiKey(){
    return this._userIPApiKey;
  }

  /**
   * Sets `userIPApiKey` as this user IP locator's IP API key (*setter*).
   * @param userIPApiKey A string designating this user IP locator's new IP API key.
   */
  set userIPApiKey(userIPApiKey: string){
    this._userIPApiKey = userIPApiKey;
  }

  /**
   * Uses the **fetch API** to asynchronuously get the user IP 
   * through the IP API and using a corresponding IP API key.
   * 
   * **Note**: This method is a promise that needs to be resolved
   * prior to usage.
   */
  async getUserIP(){
    if(!this._userIP){
        const response = await fetch(this._userIPApi + "?api_key=" + this._userIPApiKey);
        const json = await response.json();
        this._userIP = json.ip_address;
    }
  }
}

/**
 * An event tracer class for business logic components.
 * It uses the **Builder** design pattern to build a trace for a given event.
 * 
 * The trace event building workflow follows a four-step process:
 * 1. trace **"when"**: traces when the event occurred (e.g., using a timestamp).
 * 1. trace **"who"**: traces who initiated the event (e.g., user IP address).
 * 1. trace **"what"**: traces the event that fired (e.g., click).
 * 1. trace **"where"**: traces the widget with which the user interaction 
 * caused the event to fire
 * (e.g., an anchor, a button, an input text field, etc.).
 * 
 * The widget tracing mechanism consists of two steps:
 * 1. tracing the same information for all widgets (e.g., ID and XPath).
 * 1. tracing some information based on the widget's tag 
 * (e.g., value for an `<input>` text field, value for `<textarea>`, 
 * chosen option for `<select>`, etc.)
 * 
 * In addition, tracing `<input>` widgets is further refined based on
 * the widget's type (*e.g., text, password, email, button, 
 * date, color, range, file, etc.*)
 * 
 * @see {@link UserIPLocator}
 */
export default class Tracer {

  /**
   * The user IP locator used by this tracer to
   * fetch the IP of the user who initiated an action
   * that requires tracing. 
   * (*i.e., the trace's "when" component*)
   * 
   * @see {@link Tracer.getTraceWho}
   */
  private userIPLocator = new UserIPLocator();

  /**
   * Builds a trace for `event` and prints it on the console once the 
   * user IP address has been fetched using the user IP locator.
   * 
   * @param event The `Event` for which the trace is built and printed.
   * 
   * @see {@link Tracer.buildTrace}
   */
  trace(event:Event){
    this.userIPLocator.getUserIP()
      .then(
        () => {
          let trace = this.buildTrace(event);
          console.info(trace);
        }, 
        (err) => {
          console.error(`Failed to fetch user IP`);
        }
      );
  }

  /**
   * Builds a trace for `event` using the **Builder** design pattern.
   * 
   * The trace event building workflow follows a four-step process:
   * 1. trace **"when"**: traces when the event occurred (e.g., using a timestamp).
   * 1. trace **"who"**: traces who initiated the event (e.g., user IP address).
   * 1. trace **"what"**: traces the event that fired (e.g., click).
   * 1. trace **"where"**: traces the widget with which the user interaction 
   * caused the event to fire 
   * (e.g., an anchor, a button, an input text field, etc.).
   * 
   * @param event The `Event` for which the trace is built.
   * @returns The built `event` trace.
   * 
   * @see {@link Tracer.getTraceWhen}
   * @see {@link Tracer.getTraceWho}
   * @see {@link Tracer.getTraceWhat}
   * @see {@link Tracer.getTraceWhere}
   */
  buildTrace(event: Event){
    let trace = "Timestamp: "+this.getTraceWhen()+", ";
    trace += "User IP: "+this.getTraceWho()+", ";
    trace += "Event: "+this.getTraceWhat(event)+", ";
    trace += "Widget: ("+this.getTraceWhere(event.target as HTMLElement)+")";
    return trace;
  }

  /**
   * Builds the **"when"** component of the event trace
   * as a string timestamp.
   * @returns The **"when"** component of the event trace as a string
   * timestamp.
   */
  getTraceWhen(){
    return new Date(Date.now()).toUTCString();
  }

  /**
   * Builds the **"who"** component of the event trace
   * as a string user IP.
   * @returns The **"who"** component of the event trace as a string
   * user IP.
   */
  getTraceWho(){
    return this.userIPLocator.userIP;
  }

  /**
   * Builds the **"what"** component of the event trace
   * as a string describing the event type.
   * @returns The **"what"** component of the event trace as a string
   * describing the event type.
   */
  getTraceWhat(event: Event){
    return event.type;
  }

  /**
   * Builds the **"where"** component of the event trace
   * as a string describing the widget with which 
   * the interaction caused the event to fire.
   * 
   * The widget tracing mechanism consists of two steps:
   * 1. tracing the same information for all widgets (e.g., ID and XPath).
   * 1. tracing some information based on the widget's tag 
   * (e.g., value for an `<input>` text field, value for `<textarea>`, 
   * chosen option for `<select>`, etc.)
   * 
   * @returns The **"where"** component of the event trace as a string
   * describing the widget with which the interaction caused the event to fire.
   * 
   * @see {@link Tracer.getWidgetID}
   * @see {@link Tracer.getXPath}
   * @see {@link Tracer.getTraceInput}
   * @see {@link Tracer.getTraceTextArea}
   * @see {@link Tracer.getTraceSelect}
   */
  getTraceWhere(target: HTMLElement){
    let widgetTrace = "Tag: "+target.tagName+", ";
    widgetTrace += "ID: "+this.getWidgetID(target)+", ";
    widgetTrace += "XPath: "+this.getXPath(target, "");

    switch(target.tagName){
        case "INPUT":
            widgetTrace += ", "+this.getTraceInput(target as HTMLInputElement);
            break;
        
        case "TEXTAREA":
            widgetTrace += ", "+this.getTraceTextArea(target as HTMLTextAreaElement);
            break;

        case "SELECT":
            widgetTrace += ", "+this.getTraceSelect(target as HTMLSelectElement);
            break;
    }
    
    return widgetTrace;
  }

  /**
   * Completes building the **"where"** component of the trace 
   * for the event fired by interacting with the `<input>` widget `'input'`.
   * 
   * Tracing `<input>` widgets is refined based on
   * the widget's type (*e.g., text, password, email, button, 
   * date, color, range, file, etc.*)
   * @param input The `<input>` widget with which the user interacted to
   * fire the event whose trace is being built.
   * @returns The rest of the **"where"** component of the trace 
   * for the event fired by interacting with the `<input>` widget `'input'`
   * as a string.
   */
  getTraceInput(input: HTMLInputElement){
    let type = input.getAttribute("type");
    let inputTrace = "Type: "+type+", ";
    switch(type){
        case "text":
            inputTrace += "Entered Text Value: "+input.value;
            break;

        case "password":
            inputTrace += "Entered Password Value: N/A (Password placeholder)";
            break;

        case "email":
            inputTrace += "Entered Email Value: "+input.value;
            break;

        case "tel":
            inputTrace += "Entered Telephone Value: "+input.value;
            break;

        case "search":
            inputTrace += "Entered Searched Value: "+input.value;
            break;

        case "date":
            inputTrace += "Entered Date Value: "+new Date(input.value).toLocaleDateString();
            break;

        case "dateTime-local":
            inputTrace += "Entered Local Date-Time Value: "+new Date(input.value).toLocaleString();
            break;

        case "time":
            inputTrace += "Entered Time Value: "+input.value;
            break;

        case "month":
            inputTrace += "Entered Month Value: "+input.value;
            break;

        case "week":
            inputTrace += "Entered Week Value: "+input.value;
            break;

        case "number":
            inputTrace += "Entered Number Value: "+input.value;
            break;
        
        case "range":
            let min = input.getAttribute("min") || "0";
            let max = input.getAttribute("max") || "100";
            inputTrace += "Entered Range ["+min+", "+max+"]: "+input.value;
            break;
        
        case "color":
            inputTrace += "Entered Color Value: "+input.value;
            break;

        case "file":
            inputTrace += "Uploaded File Path: "+input.value;
            break;

        case "checkbox":
            inputTrace += "Checked Value: "+(input.checked? input.value : "off");
            break;
        
        case "radio":
            inputTrace += "Chosen Value: "+input.value;
            break;
    }

    return inputTrace;
  }

  /**
   * Completes building the **"where"** component of the trace 
   * for the event fired by interacting with the `<textarea>` widget `'textarea'`.
   * 
   * @param textarea The `<textarea>` widget with which the user interacted to
   * fire the event whose trace is being built.
   * @returns The rest of the **"where"** component of the trace 
   * for the event fired by interacting with the `<textarea>` widget `'textarea'`
   * as a string.
   */
  getTraceTextArea(textArea: HTMLTextAreaElement){
    return "Entered Value: "+textArea.value;
  }

  /**
   * Completes building the **"where"** component of the trace 
   * for the event fired by interacting with the `<select>` widget `'select'`.
   * 
   * @param select The `<select>` widget with which the user interacted to
   * fire the event whose trace is being built.
   * @returns The rest of the **"where"** component of the trace 
   * for the event fired by interacting with the `<select>` widget `'select'`
   * as a string.
   */
  getTraceSelect(select: HTMLSelectElement){
    return "Chosen Option: "+select.value;
  }

  /**
   * Returns/generates the ID of the widget `element`.
   * 
   * If `element` has no ID, then a default ID generation mechanism is used.
   * @param element The widget whose ID will be returned/generated.
   * @returns The ID of the widget `element`
   * 
   * @see {@link Tracer.getDefaultWidgetID}
   */
  getWidgetID(element: Element): string {
    let widgetID = element.id;

    if (!widgetID)
      widgetID = this.getDefaultWidgetID(element);

    return widgetID;
  }

  /**
   * Generates a default ID for the widget `element`.
   * 
   * The default ID generation mechanism can change over time, 
   * but for the time being it is returned by `getTextOfFirstNonEmptyChild()`.
   * @param element The widget whose ID will be generated by default.
   * @returns The ID of the widget `element` generated by default.
   * 
   * @see {@link Tracer.getTextOfFirstNonEmptyChild}
   */
  getDefaultWidgetID(element: Element): string{
    return this.getTextOfFirstNonEmptyChild(element);
  }

  /**
   * Gets the text value of the first non empty child of `element`.
   * If `element` has exclusively empty children and a parent element `p`, then
   * the search continues recursively from `p`.
   * @param element The parent element from which to start searching for
   * the text value of the first non empty child element.
   * @returns The text value of the first non empty child of `element`.
   */
  getTextOfFirstNonEmptyChild(element: Element): string{
    let text = "";
    for (let child of Array.from(element.childNodes)){
        text = child.textContent.replace(/[\\n\\r]+|[\\s]{2,}/g, ' ').trim();
        
        if (text.length > 0)
          break;
    }

    if(text.length == 0 && element.parentElement)
        return this.getTextOfFirstNonEmptyChild(element.parentElement);
    
        return text;
  }

  /**
   * Returns the XPath of the widget `element` starting from 
   * `current`, the accumulated XPath of all children of `element`.
   * 
   * If `element` denotes the <html> root element, then the returned XPath
   * will be `/html[1] + current`. Otherwise, the parent `p` of `element`
   * will be visited to capture the index of `element`'s tag among its siblings
   * that share the same tag. Afterwards, the process repeats recursively from 
   * `p`, while `newCurrent` becomes `/elementTag[index]+oldCurrent`.
   * 
   * @param element The widget whose XPath will be computed.
   * @param current The accumulated XPath of all children of `element`.
   * @returns The XPath of the widget `element`.
   */
  getXPath(element: HTMLElement, current: string) {
    let childTag = element.tagName.toLowerCase();
    if (childTag == 'html')
        return '/html[1]' + current;
    
    let count = 0;
    let parent = element.parentElement;
    let children = parent.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.nodeType === 1 && child.tagName.toLowerCase() === childTag)
            count++;
        if (child === element)
            return this.getXPath(parent, '/'+childTag+'['+count+']'+current);
    }
  }
}