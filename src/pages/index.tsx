import * as React from "react";
import type { GetServerDataReturn, HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";
import { Container } from "../components/Container";
import { Table } from "../components/Table";
import { Title } from "../components/Title";

const IndexPage = ({ serverData }: PageProps) => {
  const infos = (serverData as ServerDataProps).infos;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <Container>
      <Title>
        {year}년 {month + 1}월 {day}일 총 채용 공고수: {infos.length}
      </Title>

      <Link to="/interview">인터뷰 연습하기</Link>

      <Table>
        <thead>
          <tr>
            <th>회사 이름</th>
            <th>직군</th>
            <th>채용공고</th>
          </tr>
        </thead>
        <tbody>
          {infos.map(({ company, position, link }) => (
            <tr>
              <td>{company}</td>
              <td>{position}</td>
              <td>
                {" "}
                <Link to={link} target="_blank">
                  {link}
                </Link>
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

type InfoType = {
  company: string;
  position: string;
  link: string;
};

type ServerDataProps = {
  infos: InfoType[];
};

export async function getServerData(): GetServerDataReturn<ServerDataProps> {
  const res = await fetch(
    "https://jungmini.s3.ap-northeast-2.amazonaws.com/info.json"
  );
  const data = (await res.json()) as InfoType[];

  return {
    props: {
      infos: data,
    },
  };
}
