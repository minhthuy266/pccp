import { MarkdownPreview } from "../../components/MarkdownPreview";
import { final36LessonByOrder, final36Lessons, type Final36Lesson } from "./catalog";

function LessonTile({ lesson }: { lesson: Final36Lesson }) {
  return <a className="final36-card" href={`#/final36/${lesson.order}`}>
    <div className="final36-card-top">
      <span>{String(lesson.order).padStart(2, "0")}</span>
      <span className="final36-arrow" aria-hidden="true">↗</span>
    </div>
    <h2>{lesson.vietnameseTitle}</h2>
    <p>{lesson.pattern}</p>
    <small>{lesson.coreFlow}</small>
  </a>;
}

function LessonDetail({ lesson }: { lesson: Final36Lesson }) {
  const previous = final36LessonByOrder.get(lesson.order - 1);
  const next = final36LessonByOrder.get(lesson.order + 1);

  return <main className="final36-detail">
    <div className="final36-detail-nav">
      <a href="#/final36">← Tất cả 36 bài</a>
      <div>
        {previous && <a href={`#/final36/${previous.order}`}>← Bài {previous.order}</a>}
        {next && <a href={`#/final36/${next.order}`}>Bài {next.order} →</a>}
      </div>
    </div>

    <header className="final36-detail-heading">
      <div className="final36-number">{String(lesson.order).padStart(2, "0")}</div>
      <div>
        <p className="eyebrow">{lesson.pattern}</p>
        <h1>{lesson.vietnameseTitle}</h1>
        <p className="final36-original-title">{lesson.title}</p>
      </div>
      {lesson.officialUrl && <a className="final36-official" href={lesson.officialUrl} target="_blank" rel="noreferrer">
        Mở đề PCCP <span aria-hidden="true">↗</span>
      </a>}
    </header>

    <div className="final36-split">
      <article className="final36-statement">
        <div className="final36-panel-label"><span>01</span> Đề bài tiếng Việt</div>
        <MarkdownPreview markdown={lesson.statement} />
      </article>

      <article className="final36-solution">
        <div className="final36-panel-label"><span>02</span> Lời giải ngắn gọn</div>
        <div className="final36-solution-summary">
          <div><small>Pattern</small><strong>{lesson.pattern}</strong></div>
          <div><small>Cách làm</small><p>{lesson.coreFlow}</p></div>
          <div className="final36-trap"><small>Cẩn thận</small><p>{lesson.trap}</p></div>
        </div>
        <div className="final36-code-heading">
          <div><span>03</span><h2>Code JavaScript</h2></div>
          <small>Code chuẩn từ tài liệu recall</small>
        </div>
        <pre className="final36-code"><code>{lesson.code}</code></pre>
      </article>
    </div>
  </main>;
}

export function Final36({ lessonOrder }: { lessonOrder?: string }) {
  const lesson = lessonOrder ? final36LessonByOrder.get(Number(lessonOrder)) : undefined;
  if (lessonOrder && !lesson) return <main className="final36-not-found"><h1>Không tìm thấy bài {lessonOrder}</h1><a href="#/final36">Về danh sách 36 bài</a></main>;
  if (lesson) return <LessonDetail lesson={lesson} />;

  return <main className="final36-index">
    <section className="final36-hero">
      <div>
        <p className="eyebrow">PCCP FINAL · JAVASCRIPT</p>
        <h1>36 bài. Một nơi để<br />đọc đề và chốt code.</h1>
        <p>Chọn một card để xem đề tiếng Việt ở bên trái, lời giải cô đọng và code hoàn chỉnh ở bên phải.</p>
      </div>
      <div className="final36-hero-count"><strong>36</strong><span>bài trọng tâm</span></div>
    </section>

    <div className="final36-toolbar">
      <p><span /> Sẵn sàng ôn tập</p>
      <span>{final36Lessons.length} / 36 bài đã tải</span>
    </div>
    <section className="final36-grid" aria-label="Danh sách 36 bài PCCP">
      {final36Lessons.map((item) => <LessonTile key={item.order} lesson={item} />)}
    </section>
  </main>;
}


