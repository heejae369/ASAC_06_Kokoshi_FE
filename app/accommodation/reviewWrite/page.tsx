"use client";

import React, { useState } from "react";
import styles from "@/styles/ReviewWrite.module.css";

const Review = () => {
  const [rating, setRating] = useState<number>(0); // 별점 상태
  const [reviewText, setReviewText] = useState<string>(""); // 리뷰 텍스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [images, setImages] = useState<File[]>([]); // 업로드된 이미지 상태

  // 별점 설정
  const handleRating = (value: number) => {
    setRating(value);
  };

  // 파일 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages = Array.from(event.target.files);

    // 최대 5개의 이미지 제한
    if (images.length + newImages.length > 5) {
      alert("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    setImages([...images, ...newImages]);
    setIsModalOpen(false); // 모달 닫기
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // 등록 버튼 클릭
  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("별점과 후기를 모두 작성해주세요.");
      return;
    }
    console.log({
      rating,
      reviewText,
      images,
    });
    alert("후기가 등록되었습니다!");
  };

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <h1 className={styles.headerTitle}>후기 작성하기</h1>

      {/* 별점 */}
      <div className={styles.ratingSection}>
        <p className={styles.ratingValue}>{rating.toFixed(1)}</p>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`${styles.star} ${i < rating ? styles.filledStar : ""}`}
              onClick={() => handleRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <p className={styles.ratingInfo}>숙소에 대한 별점을 눌러주세요.</p>
      </div>

      <hr className={styles.hr} />

      {/* 후기 작성 입력 */}
      <div className={styles.reviewInput}>
        <p>후기 작성하기</p>
      </div>
      <textarea
        className={styles.textarea}
        placeholder="숙소에 대한 상세한 후기를 입력해주세요."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      {/* 사진 업로드 */}
      <div className={styles.imageUploadContainer}>
        <button
          className={styles.imageUploadButton}
          onClick={() => setIsModalOpen(true)}
        >
          + 사진 업로드
        </button>

        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index + 1}`}
                className={styles.uploadedImage}
              />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.modalButton}
              onClick={() => {
                alert("사진 찍기 기능이 호출되었습니다.");
                setIsModalOpen(false);
              }}
            >
              사진 찍기
            </button>
            <label htmlFor="imageInput" className={styles.modalButton}>
              사진 보관함
            </label>
            <input
              type="file"
              id="imageInput"
              className={styles.hiddenInput}
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <button
              className={styles.cancelButton}
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 등록 버튼 */}
      <button className={styles.submitButton} onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
};

export default Review;
