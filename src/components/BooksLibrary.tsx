import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { BookOpenIcon, SparklesIcon } from './Icons';

import book48Laws from '../assets/48 Laws of Power _ Book Cover.jfif';
import bookAtomic from '../assets/Atomic_habits.jfif';
import bookMastery from '../assets/Mastery.jfif';
import bookMetamorphosis from '../assets/Metamorphsis.jfif';
import bookNoLongerHuman from '../assets/No Longer Human.jfif';
import bookRichDad from '../assets/Rich Dad Poor Dad.jfif';
import bookCourage from '../assets/The Courage to Be Disliked.jfif';
import bookRichMommies from "../assets/The Rich Mommies Club's Amazon Page.jfif";
import bookWhiteNights from '../assets/White Nights by Fyodor Dostoevsky _ classic literature _ book recommendations _ tbr list.jfif';
import bookArtOfWar from '../assets/art_of_war.jfif';
import bookSubtleArt from '../assets/subtle_art_of_not_giving_a_fuck.jfif';
import bookPsychopaths from '../assets/surrounded_by_psychopaths.jfif';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: 'Classics' | 'Strategy' | 'Mindset' | 'Psychology';
  cover: string;
  description: string;
  status: 'Read' | 'Favorites' | 'Core Influence' | 'Reading';
}

export const booksData: BookItem[] = [
  {
    id: 'no-longer-human',
    title: 'No Longer Human',
    author: 'Osamu Dazai',
    category: 'Classics',
    cover: bookNoLongerHuman,
    description: 'A deeply poignant, unflinching exploration of alienation, masking, and the human condition.',
    status: 'Reading',
  },
  {
    id: 'metamorphosis',
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    category: 'Classics',
    cover: bookMetamorphosis,
    description: 'Surrealist existential exploration of identity, alienation, and human existence.',
    status: 'Favorites',
  },
  {
    id: 'white-nights',
    title: 'White Nights',
    author: 'Fyodor Dostoevsky',
    category: 'Classics',
    cover: bookWhiteNights,
    description: 'Poetic sentimental journey examining solitude, brief connections, and longing.',
    status: 'Favorites',
  },
  {
    id: '48-laws-of-power',
    title: '48 Laws of Power',
    author: 'Robert Greene',
    category: 'Strategy',
    cover: book48Laws,
    description: 'Distilled timeless wisdom on power dynamics, leverage, and strategic positioning.',
    status: 'Favorites',
  },
  {
    id: 'mastery',
    title: 'Mastery',
    author: 'Robert Greene',
    category: 'Strategy',
    cover: bookMastery,
    description: 'The rigorous apprenticeship path to creative intuition and effortless craft.',
    status: 'Core Influence',
  },
  {
    id: 'art-of-war',
    title: 'The Art of War',
    author: 'Sun Tzu',
    category: 'Strategy',
    cover: bookArtOfWar,
    description: 'Ancient tactical manual on positioning, calculation, and winning without conflict.',
    status: 'Favorites',
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Mindset',
    cover: bookAtomic,
    description: 'Tiny changes, remarkable results on compounding everyday systems and identity.',
    status: 'Core Influence',
  },
  {
    id: 'courage-to-be-disliked',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi & F. Koga',
    category: 'Psychology',
    cover: bookCourage,
    description: 'Unlocking personal freedom, separation of tasks, and true agency via Adlerian psychology.',
    status: 'Core Influence',
  },
  {
    id: 'surrounded-by-psychopaths',
    title: 'Surrounded by Psychopaths',
    author: 'Thomas Erikson',
    category: 'Psychology',
    cover: bookPsychopaths,
    description: 'Decoding manipulation, social dynamics, and behavioral patterns in everyday environments.',
    status: 'Read',
  },
  {
    id: 'subtle-art',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    category: 'Mindset',
    cover: bookSubtleArt,
    description: 'Raw, practical framework on choosing personal struggles and defining values.',
    status: 'Read',
  },
  {
    id: 'rich-dad-poor-dad',
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    category: 'Mindset',
    cover: bookRichDad,
    description: 'Mindset shifts around financial intelligence, asset building, and capital velocity.',
    status: 'Read',
  },
  {
    id: 'rich-mommies',
    title: 'The Rich Mommies Club',
    author: 'Contemporary',
    category: 'Mindset',
    cover: bookRichMommies,
    description: 'Modern perspectives on modern society, wealth dynamics, and lifestyle architecture.',
    status: 'Read',
  },
];

type BookCategoryFilter = 'Classics' | 'Strategy' | 'Mindset' | 'Psychology';

export function BooksLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<BookCategoryFilter>('Classics');
  const [activeBook, setActiveBook] = useState<BookItem | null>(null);

  const filteredBooks = booksData.filter((b) => b.category === selectedCategory);
  const categories: BookCategoryFilter[] = ['Classics', 'Strategy', 'Mindset', 'Psychology'];

  return (
    <section className="section-block" id="books">
      <SectionHeader 
        num="05" 
        title="Books & Reading Library" 
        tag="// 05_CURATED_SHELF"
      />

      {/* mymind-inspired Books Shelf Canvas */}
      <Reveal className="books-shelf-card">
        {/* Top Control Bar */}
        <div className="books-top-bar">
          <div className="books-top-left">
            <div className="books-shelf-pill">
              <BookOpenIcon />
              <span>BOOKSHELF</span>
            </div>
            <span className="books-total-count">{booksData.length} VOLUMES</span>
          </div>

          {/* Category Tabs (Without All option) */}
          <div className="books-category-tabs">
            {categories.map((cat) => {
              const count = booksData.filter((b) => b.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`book-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="book-cat-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid-layout">
          {filteredBooks.map((book) => {
            const isSelected = activeBook?.id === book.id;
            return (
              <div 
                key={book.id} 
                className={`book-item-wrapper ${isSelected ? 'selected' : ''}`}
                onClick={() => setActiveBook(isSelected ? null : book)}
              >
                {/* 3D Realistic Book Cover Canvas */}
                <div className="book-cover-3d-box">
                  {/* Book Spine Shadow Left */}
                  <div className="book-spine-crease"></div>
                  
                  {/* Actual Cover Image */}
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="book-cover-img" 
                    loading="lazy"
                  />

                  {/* Book Page Edge Right */}
                  <div className="book-page-edge"></div>

                  {/* Subtle Light Reflection Overlay */}
                  <div className="book-gloss-sheen"></div>

                  {/* Top Status Tag */}
                  {book.status === 'Reading' && (
                    <span className="book-badge-tag reading-tag">
                      <span className="reading-pulse-dot"></span>
                      <span>READING</span>
                    </span>
                  )}
                  {book.status === 'Core Influence' && (
                    <span className="book-badge-tag">
                      <SparklesIcon />
                      <span>CORE</span>
                    </span>
                  )}
                </div>

                {/* Book Typography & Metadata */}
                <div className="book-meta-info">
                  <h4 className="book-title" title={book.title}>{book.title}</h4>
                  <p className="book-author">{book.author}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Book Detail Drawer */}
        {activeBook && (
          <div className="book-detail-banner">
            <div className="book-detail-left">
              <span className="detail-tag">{activeBook.category.toUpperCase()}</span>
              <span className="detail-title">{activeBook.title}</span>
              <span className="detail-author">by {activeBook.author}</span>
            </div>
            <p className="detail-desc">{activeBook.description}</p>
            <button 
              type="button" 
              className="book-detail-close" 
              onClick={() => setActiveBook(null)}
              aria-label="Close book details"
            >
              ✕
            </button>
          </div>
        )}

        {/* Reading Archive Footer Note */}
        <div className="books-shelf-footer-bar">
          <span className="books-footer-dot"></span>
          <span className="books-footer-text">
            Curated reading archive — <strong>not latest, many more to add</strong> from physical &amp; digital logs.
          </span>
        </div>
      </Reveal>
    </section>
  );
}
