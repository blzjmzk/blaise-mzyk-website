import Button from "@/components/button";
import Header from "@/components/header";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import rangeParser from "parse-numeric-range";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
import {
  PrismLight as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import { Node } from "unist";
import styles from "./PostPage.module.css";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("css", css);

interface Props {
  params: { slug: string };
}

const fetchPost = cache((postSlug: string) =>
  prisma.post.findUnique({ where: { slug: postSlug } })
);

interface HighlighterProps extends SyntaxHighlighterProps {
  children: string | string[];
}

interface CodeProps {
  node: Node;
  inline: boolean;
  className?: string;
  children: string | string[];
}

interface NodeWithData extends Node {
  data?: {
    meta?: string;
  };
}

const PostPage = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);
  if (!post) return notFound();

  const syntaxTheme = oneLight;

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }: CodeProps) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = (node as NodeWithData)?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = (node as NodeWithData)?.data?.meta?.replace(
            /\s/g,
            ""
          );
          const strlineNumbers = RE?.test(metadata!)
            ? RE.exec(metadata!)?.[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers || "0");
          const highlight = highlightLines;
          const data: string | null = highlight.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={true}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <>
      <Header>{post.title}</Header>
      <div className={styles.postContainer}>
        <ReactMarkdown components={MarkdownComponents}>
          {post.content}
        </ReactMarkdown>
      </div>
      <Link href="/blog">
        <div className={styles.postButton}>
          <Button variant="primary" width="100%">
            See Other Posts
          </Button>
        </div>
      </Link>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const post = await fetchPost(params.slug);
  return {
    title: "Blog | " + post?.title,
    description: post?.description,
  };
}

export default PostPage;
