// package com.coderains.task.config.filter;

// import java.io.IOException;
// import java.nio.charset.StandardCharsets;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Map;

// import javax.crypto.SecretKey;

// import org.springframework.lang.NonNull;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.coderains.task.SecurityConstants;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.security.Keys;
// import jakarta.servlet.http.HttpServletResponse;

// public class JWTTokenValidatorFilter extends OncePerRequestFilter {

// 	@Override
// 	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
// 			@NonNull FilterChain filterChain) throws ServletException, IOException {
// 		String jwt = request.getHeader(SecurityConstants.JWT_HEADER);
// 		if (jwt != null) {
// 			try {
// 				SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));
// 				Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
// 				String username = String.valueOf(claims.get("username"));
// 				// String authorities = String.valueOf(claims.get("authorities"));
// 				Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
// 						extractRoleUser(claims));
// 				SecurityContextHolder.getContext().setAuthentication(authentication);

// 			} catch (Exception e) {
// 				throw new BadCredentialsException("Invalid Token received!");
// 			}
// 		}
// 		filterChain.doFilter(request, response);
// 	}

// 	@SuppressWarnings("unchecked")
// 	private static List<GrantedAuthority> extractRoleUser(Claims claims) {
// 		List<Map<String, String>> authorities = (List<Map<String, String>>) claims.get("authorities");
// 		List<GrantedAuthority> gAuthority = new ArrayList<>();
// 		if (authorities != null) {
// 			for (var authority : authorities) {
// 				authority.get("authorities");
// 				gAuthority.add(new SimpleGrantedAuthority(authority.get("authority")));

// 			}
// 		}
// 		return gAuthority; // Return null if ROLE_USER is not found in authorities
// 	}

// 	@Override
// 	protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
// 		String path = request.getServletPath();
// 		return path.equals("/user.ss");
// 	}

// }

