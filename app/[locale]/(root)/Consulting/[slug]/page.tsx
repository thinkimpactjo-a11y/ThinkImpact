import CategoryPageProvider, { RouteParams } from "./CategoryPageProvider";

type PageProps = {
  params: Promise<RouteParams>;
};

export default function Page(props: PageProps) {
  return <CategoryPageProvider params={props.params} />;
}

export const revalidate = 60;
