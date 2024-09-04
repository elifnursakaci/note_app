import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateProps } from "../../pages/Create";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { v4 } from "uuid";
import styles from "./form.module.css";

const CustomForm = ({
  availableTags,
  handleSubmit,
  createTag,
  markdown = "",
  title = "",
  tags = [],
}: CreateProps) => {
  const navigate = useNavigate();

  // state
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags,
    });

    navigate("/");
  };

  return (
    <Form onSubmit={handleSend} className="mt-4">
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control defaultValue={title} ref={inputRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                onCreateOption={(text: string) => {
                  const newTag: Tag = { label: text, value: v4() };

                  createTag(newTag);

                  setSelectedTags([...selectedTags, newTag]);
                }}
                value={selectedTags}
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown" className="mt-4">
          <Form.Label>İçeirk (markdown destekler)</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={textareaRef}
            as="textarea"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>

        <Stack
          gap={4}
          direction="horizontal"
          className="justify-content-end mt-5"
        >
          <Button type="submit">Kaydet</Button>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;
