package seg3x02.tempconverterapi

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain

@Configuration
class WebAuthenticaton {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
                .authorizeHttpRequests { auth -> auth.anyRequest().authenticated() }
                .httpBasic(Customizer.withDefaults())
                .csrf()
                .disable()

        return http.build()
    }

    @Bean
    fun userDetailsService(): UserDetailsService {
        val user1: UserDetails =
                User.withUsername("user1").password(passwordEncoder().encode("pass1")).build()

        val user2: UserDetails =
                User.withUsername("user2").password(passwordEncoder().encode("pass2")).build()

        return InMemoryUserDetailsManager(user1, user2)
    }

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
