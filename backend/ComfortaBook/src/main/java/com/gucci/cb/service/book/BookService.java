package com.gucci.cb.service.book;

import java.util.List;

import com.gucci.cb.domain.book.Book;
import com.gucci.cb.dto.book.BookDTO;

public interface BookService {

	// 도서 정보 등록
	Book insert(Book book);
	
	// 전체 도서 조회
	List<Book> findAll();
	
	// 도서 상세 조회
	Book findByNo(Long bookNo);
	
	// 도서 정보 수정
	void updateByNo(Long bookNo, BookDTO bookDto);
	
	// 도서 삭제
	void deleteByNo(Long bookNo);
	
}