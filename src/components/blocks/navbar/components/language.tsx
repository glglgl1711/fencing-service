import { useState } from "react";

// language list
const supportLanguage = ["En", "Bn", "Es", "De"];

export default function Language() {
  const [language, setLanguage] = useState(supportLanguage[0]);

  return (
    <li className="nav-item dropdown language-select text-uppercase">
      <a
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        className="nav-link dropdown-item dropdown-toggle">
        {language}
      </a>

      <ul className="dropdown-menu">
          <li className="nav-item" key={'1'}>
            <button className="dropdown-item">
              내정보보기
            </button>
          </li>
      </ul>
    </li>
  );
}
