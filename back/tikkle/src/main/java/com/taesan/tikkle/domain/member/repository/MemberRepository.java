package com.taesan.tikkle.domain.member.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.taesan.tikkle.domain.member.dto.response.MemberRankResponse;
import com.taesan.tikkle.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
	<T> Optional<T> findById(UUID id, Class<T> type);

	Optional<Member> findByEmail(String email);

	@Query("SELECT new com.taesan.tikkle.domain.member.dto.response.MemberRankResponse(" +
		"m.id, m.name, a.rankingPoint, COUNT(tl.id)) " +
		"FROM Member m " +
		"JOIN Account a ON m.id = a.member.id " +
		"LEFT JOIN TradeLog tl ON a.id = tl.recAccount.id " +
		"GROUP BY m.id, m.nickname, a.rankingPoint")
	List<MemberRankResponse> findMemberRankings();

	@Query("SELECT new com.taesan.tikkle.domain.member.dto.response.MemberRankResponse(" +
		"m.id, m.name, a.rankingPoint, COUNT(tl.id)) " +
		"FROM Member m " +
		"JOIN Account a ON m.id = a.member.id " +
		"LEFT JOIN TradeLog tl ON a.id = tl.recAccount.id " +
		"GROUP BY m.id, m.nickname, a.rankingPoint")
	List<MemberRankResponse> findMemberRankings(Pageable pageable);

	Optional<Member> findByIdAndDeletedAtIsNull(UUID memberId);
}
