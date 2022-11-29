import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanFind, getCountryName } from "../../redux/actions";
import style from "./search.module.css";

const Search = () => {
  const [input, setInput] = useState({
    country: "",
  });
  const handleClick = ()=>{
    setInput({
      ...input,
      country:'',
    })
  }
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (input.country !== "") dispatch(getCountryName(input.country));
    if (input.country === "") dispatch(cleanFind());
  }, [dispatch, input.country]);

  const find = useSelector((state) => state.find);

  return (
    <>
      <div className={style.boxFind}>
        <input
          className={style.input}
          name="country"
          type="text"
          placeholder="    Find A Country"
          onChange={handleChange}
        />
        <div className={style.result}>
          <ul className={style.link}>
            {find.map(
              (c, i) =>
                i < 5 && (
                  <li key={c.name}>
                    <Link  to={"/countries/" + c.id}>
                      {i < 5 && (
                        <label onClick={handleClick} className={style.label} key={c.name}>
                          {c.name}
                        </label>
                      )}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Search;
