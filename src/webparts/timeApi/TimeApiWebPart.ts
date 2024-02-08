import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "TimeApiWebPartStrings";
import TimeApi from "./components/TimeApi";
import { ITimeApiProps } from "./components/ITimeApiProps";
import { HttpClient, HttpClientResponse,IHttpClientOptions} from "@microsoft/sp-http";
import App from "./App";
import { getSP } from "./api/pnpjsConfig";

export interface ITimeApiWebPartProps {
  description: string;
}

export default class TimeApiWebPart extends BaseClientSideWebPart<ITimeApiWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<ITimeApiProps> = React.createElement(
      App,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
      }
    );

    ReactDom.render(element, this.domElement);
  }
  private _getJoke(): Promise<any> {
    const httpOptions:IHttpClientOptions={
      headers:new Headers(),
      method:"GET",
      mode:'no-cors'
    } 
    return this.context.httpClient
      .get(
        `https://www.scorebat.com/video-api/v1/`,
        // `https://timeapi.io/api/TimeZone/AvailableTimeZones`,
        HttpClient.configurations.v1,
        httpOptions
      )
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then((textResponse) => {
        return textResponse;
      }) as Promise<any>;
  }

  protected async onInit(): Promise<void> {
    // const httpClientOptions:any = {
    //   headers: { "Content-Type": "application/json"  },
    //   method:"GET"

    // };
    // const callExternal= await  this.context.httpClient.get("https://timeapi.io/api/TimeZone/AvailableTimeZones",HttpClient.configurations.v1,httpClientOptions);
    // let response= await callExternal.json();
    // console.log(response);
    getSP(this.context);
    this._getJoke().then((response) => {
      console.log(response);
    }).catch(r=>{
      console.log(r);
    });

    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error("Unknown host");
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
