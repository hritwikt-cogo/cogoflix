import 'wired-elements'
function Window({mov}) {
  return  (
          <div>
              {mov.length > 0 ? mov.map((r) => {
                  return (<>
                  <img src={r.Poster} alt="" />
                  <div>{r.Title}</div>
                  <div>{r.Year}</div>
                  <div>{r.Type}</div>
                  <div>{r.imdbID}</div>
                  </>)
              }): ""}
          </div>
  )
}

export default Window;