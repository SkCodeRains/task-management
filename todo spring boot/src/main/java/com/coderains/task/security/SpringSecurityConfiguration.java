// package com.coderains.task.security;

// import static org.springframework.security.config.Customizer.withDefaults;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SpringSecurityConfiguration {
// 	@Bean
// 	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

// 		return http.authorizeHttpRequests(
// 				auth -> auth.requestMatchers("/**", "/**").permitAll().anyRequest().authenticated()

// 		)

// 				.httpBasic(withDefaults()).csrf(csrf -> csrf.disable())

// 				.sessionManagement(ses -> ses.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
// 	}

// 	@Bean
// 	WebSecurityCustomizer webSecurityCustomizer() {
// 		return (web) -> web.ignoring().requestMatchers("/resources/static/**", "/resources/public/**");
// 	}

// }
