import * as React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";
import { Container } from "../components/Container";
import { Table } from "../components/Table";
import { Title } from "../components/Title";

type InfoType = {
  company: string;
  position: string;
  link: string;
};

const cache: any = {};
const url = "https://jungmini.s3.ap-northeast-2.amazonaws.com/info.json";

const IndexPage = () => {
  const [infos, setInfos] = React.useState<InfoType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  React.useEffect(() => {
    const fetchInfoData = async () => {
      if (cache[url]) {
        setInfos(cache[url]);
        return;
      }

      try {
        const res = await fetch(url);
        setLoading(true);
        const data = (await res.json()) as InfoType[];
        cache[url] = data;
        setInfos(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchInfoData();
  }, []);

  return (
    <Container>
      <Title>
        {year}년 {month + 1}월 {day}일 총 채용 공고수: {infos.length}
      </Title>

      <Link to="/interview">인터뷰 연습하기</Link>

      {loading && <h1>로딩중..</h1>}
      {error && <h1>에러!</h1>}
      <Table>
        <thead>
          <tr>
            <th>회사 이름</th>
            <th>직군</th>
            <th>채용공고</th>
          </tr>
        </thead>
        <tbody>
          {infos.map(({ company, position, link }, index) => (
            <tr key={index}>
              <td>{company}</td>
              <td>{position}</td>
              <td>
                <a href={link} target="_blank">
                  {link}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>채용공고 모아보기</title>;
