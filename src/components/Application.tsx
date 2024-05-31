import React, { useContext, useEffect } from "react";
import Footer from "./common/layout/Footer";
import Header from "./common/layout/Header";
import Loading from "./common/layout/Loading";
import { AppContext } from "./reducer/App";
import { getRest } from "./utils/Api";
import useWindowsUtils from "./utils/Windows";

const Item = ({
  label,
  url,
  metas,
}: {
  label: string;
  url: string;
  metas: any;
}) => {
  return (
    <tr>
      <td>
        <strong>{label}</strong>
        <br />
        <a target="_blank" href={url}>
          {url}
        </a>
        {metas?.github && (
          <>
            <br />
            <a target="_blank" href={metas.github}>
              {metas.github}
            </a>
          </>
        )}
        {metas?.versionsCount && metas?.currentVersion && (
          <>
            <br />
            <span className="badge">{metas?.currentVersion}</span>
            {metas?.versionsCount} versions
          </>
        )}
      </td>
      <td>
        <span>{metas?.version ? metas?.version : "/"}</span>
      </td>
    </tr>
  );
};

const Application: React.FC<{}> = () => {
  const { state, dispatch } = useContext(AppContext);
  const windowsUtils = useWindowsUtils();
  const [result, setResult] = React.useState<any>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const onClick = () => {
    if (windowsUtils.origin) {
      dispatch({ type: "UPDATE", payload: { loading: true } });
      dispatch({ type: "UPDATE", payload: { complete: false } });
      getRest(`${windowsUtils.origin}/api/list`).then((json) => {
        dispatch({ type: "UPDATE", payload: { loading: false } });
        dispatch({ type: "UPDATE", payload: { complete: true } });
        if (json) {
          console.log(json);
          setResult(json);
        }
      });
    }
  };
  useEffect(() => {
    if (!loaded) {
      onClick();
    }
    setLoaded(true);
  }, [loaded]);
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="content container">
        {!state.loading ? (
          <>
            {state.complete ? (
              <div className="main">
                <div className="re-run">
                  <button className="button" onClick={() => onClick()}>
                    Re-Run!
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>UI Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((item: any, index: number) => (
                      <Item
                        label={item.metas?.label || item.key}
                        url={item.url}
                        metas={item.metas}
                        key={`item${index}`}
                      ></Item>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="run">
                <button className="button" onClick={() => onClick()}>
                  Run!
                </button>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Application;
