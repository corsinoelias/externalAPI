import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import { Caching } from "@pnp/queryable";
import { Answer } from '../types/quiz';
import { IItemAddResult } from "@pnp/sp/items";
// eslint-disable-next-line no-var
var _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {//Set up pnp sp service
  if (!!context) {
    // eslint-disable-line eqeqeq
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const _addQuiz = async (LIST_NAME: string,quiz:any): Promise<IItemAddResult> => {
  try {
    // do PnP JS query, some notes:
    //   - .expand() method will retrive Item.File item but only Length property
    //   - .get() always returns a promise
    //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

    //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
    //this._sp.using(Caching("session"));

    //Creating a new sp object to include caching behavior. This way our original object is unchanged.
    const spCache = spfi(_sp).using(Caching({ store: "session" }));
    const response = await spCache.web.lists.getByTitle(LIST_NAME).items.add(quiz);

    return response;
  } catch (er) {}
};
export const _addQuizAttempt = async (LIST_NAME: string,quiz:Answer,id:number): Promise<any> => {
  try {
    // do PnP JS query, some notes:
    //   - .expand() method will retrive Item.File item but only Length property
    //   - .get() always returns a promise
    //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

    //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
    //this._sp.using(Caching("session"));

    //Creating a new sp object to include caching behavior. This way our original object is unchanged.
    const spCache = spfi(_sp).using(Caching({ store: "session" }));
    const response = await spCache.web.lists.getByTitle(LIST_NAME).items.add({...quiz, GameId:id});

    return response;
  } catch (er) {}
};
export const _getQuizes = async (LIST_NAME: string): Promise<any> => {
  try {
    // do PnP JS query, some notes:
    //   - .expand() method will retrive Item.File item but only Length property
    //   - .get() always returns a promise
    //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

    //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
    //this._sp.using(Caching("session"));

    //Creating a new sp object to include caching behavior. This way our original object is unchanged.
    const spCache = spfi(_sp).using(Caching({ store: "session" }));
    const response = await spCache.web.lists.getByTitle(LIST_NAME).items();

    return response;
  } catch (er) {}
};
