import styled from "styled-components";

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  th,
  td {
    padding: 6px 15px;
  }

  th {
    background: #ff7e36;
    color: #fff;
    text-align: center;
  }

  tr:first-child th:first-child {
    border-top-left-radius: 6px;
  }

  tr:first-child th:last-child {
    border-top-right-radius: 6px;
  }

  td {
    border-right: 1px solid #c6c9cc;
    border-bottom: 1px solid #c6c9cc;
  }

  td:first-child {
    border-left: 1px solid #c6c9cc;
  }

  tr:nth-child(even) td {
    background: #eaeaed;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }

  a {
    color: black;
    text-decoration: none;
  }
`;
