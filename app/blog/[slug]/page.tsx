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
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Node } from "unist";
import styles from "./PostPage.module.css";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);

interface Props {
  params: { slug: string };
}

interface CodeProps {
  node: Node;
  inline: boolean;
  className: string;
}

interface NodeWithData extends Node {
  data?: {
    meta?: string;
  };
}

const fetchPost = cache((postSlug: string) =>
  prisma.post.findUnique({ where: { slug: postSlug } })
);

interface HighlighterProps extends SyntaxHighlighterProps {
  children: string | string[];
}

const PostPage = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);

  if (!post) return notFound();
  const syntaxTheme = oneLight;

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }: CodeProps & HighlighterProps) {
      const hasMeta = (node as NodeWithData)?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = (node as NodeWithData)?.data?.meta?.replace(
            /\s/g,
            ""
          );
          const strlineNumbers = RE.test(metadata!)
            ? RE.exec(metadata!)?.[1] || "0"
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const data: string | null = highlightLines.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={className.replace("language-", "")}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={!!hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        >
          {Array.isArray(props.children)
            ? props.children.join("")
            : props.children}
        </SyntaxHighlighter>
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
