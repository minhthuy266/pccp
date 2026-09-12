import { useState } from "react";
import { MarkdownPreview } from "../../components/MarkdownPreview";
import { final36LessonByOrder, final36Lessons, type Final36Lesson } from "./catalog";
import { algorithmByLessonOrder, final36Algorithms } from "./algorithms";

function LessonTile({ lesson }: { lesson: Final36Lesson }) {
  const algorithm = algorithmByLessonOrder.get(lesson.order);
  return <a className="final36-card" href={`#/final36/${lesson.order}`}>
    <div className="final36-card-top">
      <span>{String(lesson.order).padStart(2, "0")}</span>
      <span className="final36-arrow" aria-hidden="true">↗</span>
    </div>
    <h2>{lesson.vietnameseTitle}</h2>
    <p>{algorithm?.shortLabel ?? lesson.pattern}</p>
    <small>{lesson.coreFlow}</small>
  </a>;
}

function LessonDetail({ lesson }: { lesson: Final36Lesson }) {
  const previous = final36LessonByOrder.get(lesson.order - 1);
  const next = final36LessonByOrder.get(lesson.order + 1);

  return <main className="final36-detail">
    <div className="final36-detail-nav">
      <a href="#/final36">← Tất cả {final36Lessons.length} bài</a>
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
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(final36Algorithms[0].id);
  const lesson = lessonOrder ? final36LessonByOrder.get(Number(lessonOrder)) : undefined;
  if (lessonOrder && !lesson) return <main className="final36-not-found"><h1>Không tìm thấy bài {lessonOrder}</h1><a href="#/final36">Về danh sách bài</a></main>;
  if (lesson) return <LessonDetail lesson={lesson} />;

  const selectedAlgorithm = final36Algorithms.find((algorithm) => algorithm.id === selectedAlgorithmId);
  const visibleLessons = selectedAlgorithm
    ? final36Lessons.filter((item) => selectedAlgorithm.lessonOrders.includes(item.order))
    : final36Lessons;

  return <main className="final36-index">
    <section className="final36-hero">
      <div>
        <p className="eyebrow">PCCP FINAL · JAVASCRIPT</p>
        <h1>{final36Lessons.length} bài. Một nơi để<br />đọc đề và chốt code.</h1>
        <p>Chọn thuật toán, thuộc một template lõi, rồi mở từng card để xem đề tiếng Việt và code hoàn chỉnh.</p>
      </div>
      <div className="final36-hero-count"><strong>{final36Lessons.length}</strong><span>bài trọng tâm</span></div>
    </section>

    <section className="final36-algorithm-section">
      <div className="final36-section-heading">
        <div><p className="eyebrow">Bước 01</p><h2>Chọn thuật toán</h2></div>
        <p>{final36Algorithms.length} nhóm · {final36Lessons.length} bài · mỗi nhóm một code shape</p>
      </div>
      <div className="final36-algorithm-buttons">
        <button className={!selectedAlgorithm ? "active" : ""} onClick={() => setSelectedAlgorithmId("")}>
          <span className="final36-algorithm-index">00</span>
          <span><b>Tất cả bài</b><small>Toàn bộ thư viện</small></span>
          <strong>{final36Lessons.length}</strong>
        </button>
        {final36Algorithms.map((algorithm, index) => <button
          className={selectedAlgorithmId === algorithm.id ? "active" : ""}
          key={algorithm.id}
          onClick={() => setSelectedAlgorithmId(algorithm.id)}
          aria-pressed={selectedAlgorithmId === algorithm.id}
        >
          <span className="final36-algorithm-index">{String(index + 1).padStart(2, "0")}</span>
          <span><b>{algorithm.label}</b><small>{algorithm.shortLabel}</small></span>
          <strong>{algorithm.lessonOrders.length}</strong>
        </button>)}
      </div>
    </section>

    {selectedAlgorithm && <section className="final36-template-card">
      <div className="final36-template-copy">
        <p className="eyebrow">Bước 02 · Template cần nhớ</p>
        <h2>{selectedAlgorithm.label}</h2>
        <p>{selectedAlgorithm.description}</p>
        <div><small>Khi nào bật template này?</small><strong>{selectedAlgorithm.trigger}</strong></div>
      </div>
      <div className="final36-template-code">
        <div><span>template.js</span><small>Code shape tổng quát</small></div>
        <pre><code>{selectedAlgorithm.template}</code></pre>
      </div>
    </section>}

    <div className="final36-toolbar">
      <p><span /> {selectedAlgorithm ? selectedAlgorithm.label : "Tất cả thuật toán"}</p>
      <span>{visibleLessons.length} bài trong nhóm</span>
    </div>
    <section className="final36-grid" aria-label={`Danh sách ${final36Lessons.length} bài PCCP`}>
      {visibleLessons.map((item) => <LessonTile key={item.order} lesson={item} />)}
    </section>
  </main>;
}
